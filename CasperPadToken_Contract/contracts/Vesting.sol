// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IBEP20 {
    
  /**
   * @dev Returns the amount of tokens in existence.
   */
  function totalSupply() external view returns (uint256);

  /**
   * @dev Returns the token decimals.
   */
  function decimals() external view returns (uint8);

  /**
   * @dev Returns the token symbol.
   */
  function symbol() external view returns (string memory);

  /**
  * @dev Returns the token name.
  */
  function name() external view returns (string memory);

  /**
   * @dev Returns the bep token owner.
   */
  function getOwner() external view returns (address);

  /**
   * @dev Returns the amount of tokens owned by `account`.
   */
  function balanceOf(address account) external view returns (uint256);

  /**
   * @dev Moves `amount` tokens from the caller's account to `recipient`.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transfer(address recipient, uint256 amount) external returns (bool);

  /**
   * @dev Returns the remaining number of tokens that `spender` will be
   * allowed to spend on behalf of `owner` through {transferFrom}. This is
   * zero by default.
   *
   * This value changes when {approve} or {transferFrom} are called.
   */
  function allowance(address _owner, address spender) external view returns (uint256);

  /**
   * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * IMPORTANT: Beware that changing an allowance with this method brings the risk
   * that someone may use both the old and the new allowance by unfortunate
   * transaction ordering. One possible solution to mitigate this race
   * condition is to first reduce the spender's allowance to 0 and set the
   * desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   *
   * Emits an {Approval} event.
   */
  function approve(address spender, uint256 amount) external returns (bool);

  /**
   * @dev Moves `amount` tokens from `sender` to `recipient` using the
   * allowance mechanism. `amount` is then deducted from the caller's
   * allowance.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

  /**
   * @dev Emitted when `value` tokens are moved from one account (`from`) to
   * another (`to`).
   *
   * Note that `value` may be zero.
   */
  event Transfer(address indexed from, address indexed to, uint256 value);

  /**
   * @dev Emitted when the allowance of a `spender` for an `owner` is set by
   * a call to {approve}. `value` is the new allowance.
   */
  event Approval(address indexed owner, address indexed spender, uint256 value);
  
}
/**
 * Tracer Standard Vesting Contract
 */
contract Vesting is Ownable {

    //initialize data: token, member, vesting time
    IBEP20 public token;
    address[] public members;
    uint256[] public amounts;
    uint256[] public vestingTimeList;
    uint256 releasedVestingId;
    mapping(address => bool) public admins;


    //tiger of members
    struct Tier {
        uint256 tierId;
        uint256 amountMax;
    }

    mapping(address => uint256) public whitelistOfTiers; //whitelist: (address => maxAmount)

    struct Schedule {
        uint256 amount;
        uint256 claimedAmount;
        uint256 unlockTime;
        bool isFixed;
    }

    struct Plain {
        uint256 percentage;
        uint256 unlockTime;
        bool isSent;
    }
    Plain[] public schedulePlain; // array of plains

    // user => scheduleId => schedule
    mapping(address => mapping(uint256 => Schedule)) public schedules;
    mapping(address => uint256) public numberOfSchedules; //number of the schedule by address
    mapping(address => uint256) public locked; //locked amount mapping by address

    event Claim(address indexed claimer, uint256 amount);
    event Cancelled(address account);
    event NewVesting(address indexed investor, uint256 amount, bool isFixed);
    event AddNewAdmin(address _address);
    event UnlockTokens(uint256 _timestamp);

    modifier onlyAdmin() {
        require(_msgSender() != address(0x0) && admins[_msgSender()], "Caller is not the admin");
        _;
    }

    modifier checkWhitelist(address account, uint256 amount) {
        uint256 maxAmount = whitelistOfTiers[account];
        require(maxAmount != 0 && maxAmount >= amount, "Invalid whitelist member!");
        _;
    }

    constructor(address _token) {
        require(_token != address(0x0));
        token = IBEP20(_token); // token address

        uint256 _preSaleAmount = 50000000 * 10 ** 18; //CSPD amount for presale
        require(IBEP20(_token).balanceOf(owner()) >= _preSaleAmount, "owner's balance is not enough");
        // IBEP20(_token).transfer(address(this), _preSaleAmount);

        admins[owner()] = true;  // add owner to admin role
        releasedVestingId = 0;   // set the initial releasedVestingId

        //addresses for public sale
        members.push(address(0x0C25363022587299510774E036ad078682991256));
        members.push(address(0x026116102Ae7e558Cd436325158d54020EFCf0eF));
        members.push(address(0x4B674Da5E20067B8213263720d958B5e7AbD7d8c));
        members.push(address(0xD157D2Ff5393c509777765Cf612284d53d38dE30));
        members.push(address(0xFcf2668C4EC68D2bbd36a476e30227744A0f5EB8));
        members.push(address(0x3719D24Fa12f32877f894c6F51FeECF91F16b44f));
        members.push(address(0xc0eaA0018b1192dE0c8ca46E57B84Ee907e01baC));
        members.push(address(0xc50dD8028B1C6914B67F4657F0155e5D2cE1E226));
        members.push(address(0x5B588e36FF358D4376A76FB163fd69Da02A2A9a5));
        members.push(address(0xA5664dC01BB8369EDc6116d3B267d6014681dD2F));

        //amount for public sale
        amounts.push(5000000);
        amounts.push(5000000);
        amounts.push(5000000);
        amounts.push(5000000);
        amounts.push(5000000);
        amounts.push(5000000);
        amounts.push(5000000);
        amounts.push(5000000);
        amounts.push(5000000);
        amounts.push(5000000);

        // add schedule time
        vestingTimeList.push(1639083600); // 2021-12-10 00:00:00
        vestingTimeList.push(1641762000); // 2022-01-10 00:00:00
        vestingTimeList.push(1644440400); // 2022-02-10 00:00:00
        vestingTimeList.push(1646859600); // 2022-03-10 00:00:00
        vestingTimeList.push(1649538000); // 2022-04-10 00:00:00
        vestingTimeList.push(1652130000); // 2022-05-10 00:00:00

        //initial kWhitelist
        for(uint256 i = 0; i < members.length; i++){
            whitelistOfTiers[members[i]] = 5000000;
        }
    }

    function totalSupply(uint256 totalAmount) external onlyAdmin {
        uint256 _preSaleAmount = totalAmount; //CSPD amount for presale 50000000
        require(IBEP20(token).balanceOf(owner()) >= _preSaleAmount, "owner's balance is not enough");
        IBEP20(token).transfer(address(this), _preSaleAmount);
    }

    function addAdmin(address _address) external onlyOwner {
        require(_address != address(0x0), "Zero address");
        require(!admins[_address], "This address is already added as an admin");
        admins[_address] = true;
        emit AddNewAdmin(_address);
    }

    /**
     * @notice Sets up a vesting schedule for a set user.
     * @dev adds a new Schedule to the schedules mapping.
     * @param account the account that a vesting schedule is being set up for. Will be able to claim tokens after
     *                the cliff period.
     * @param amount the amount of tokens being vested for the user.
     * @param isFixed a flag for if the vesting schedule is fixed or not. Fixed vesting schedules can't be cancelled.
     */
    function addVest(
        address account,
        uint256 amount,
        bool isFixed
    ) public onlyAdmin checkWhitelist(account, amount) {
        // check amount
        require(amount > 0, "Vesting: invalid vesting params");

        uint256 currentLocked = locked[address(token)];

        // require the token is present
        require(IBEP20(token).balanceOf(address(this)) >= currentLocked + amount, "Vesting: Not enough tokens");

        // create the schedule
        uint256 currentNumSchedules = numberOfSchedules[account];
        require(currentNumSchedules == 0, "already exist user");
        
        for(uint256 i = 0; i < schedulePlain.length; i++){
            uint256 _amount = amount * schedulePlain[i].percentage / 100;
            uint256 _unlockTime = schedulePlain[i].unlockTime;

            schedules[account][currentNumSchedules] = Schedule(
                _amount,
                0,
                _unlockTime,
                isFixed
            );

            numberOfSchedules[account] = currentNumSchedules + 1;
            locked[address(token)] = currentLocked + amount;
        }
        members.push(account);
        emit NewVesting(account, amount, isFixed);
    }

    /**
     * @notice Sets up vesting schedules for multiple users within 1 transaction.
     * @dev adds a new Schedule to the schedules mapping.
     * @param accounts an array of the accounts that the vesting schedules are being set up for.
     *                 Will be able to claim tokens after the cliff period.
     * @param amount an array of the amount of tokens being vested for each user.
     * @param isFixed bool setting if these vesting schedules can be rugged or not.
     */
    function addMultiVest(
        address[] calldata accounts,
        uint256[] calldata amount,
        bool isFixed
    ) external onlyAdmin {
        uint256 numberOfAccounts = accounts.length;
        require(
            amount.length == numberOfAccounts,
            "Vesting: Array lengths differ"
        );
        for (uint256 i = 0; i < numberOfAccounts; i++) {
            addVest(
                accounts[i],
                amount[i],
                isFixed
            );
        }
    }

    /**
     * @notice allows users to claim vested tokens if the cliff time has passed.
     * @param scheduleNumber which schedule the user is claiming against
     */
    function claim(uint256 scheduleNumber) external {
        Schedule storage schedule = schedules[msg.sender][scheduleNumber];
        require(
            schedule.unlockTime <= block.timestamp,
            "Vesting: unlockTime not reached"
        );
        require(schedule.amount > 0, "Vesting: not claimable");

        uint256 amountToTransfer = schedule.amount - schedule.claimedAmount;
        schedule.claimedAmount = schedule.amount; // set new claimed amount based off the curve
        locked[address(token)] = locked[address(token)] - amountToTransfer;
        require(IBEP20(token).transfer(msg.sender, amountToTransfer), "Vesting: transfer failed");
        emit Claim(msg.sender, schedule.amount);
    }

    /**
     * @notice Allows a vesting schedule to be cancelled.
     * @dev Any outstanding tokens are returned to the system.
     * @param account the account of the user whos vesting schedule is being cancelled.
     */
    function rug(address account, uint256 scheduleId) external onlyAdmin {
        Schedule storage schedule = schedules[account][scheduleId];
        require(!schedule.isFixed, "Vesting: Account is fixed");
        uint256 outstandingAmount = schedule.amount -
            schedule.claimedAmount;
        require(outstandingAmount != 0, "Vesting: no outstanding tokens");
        schedule.amount = 0;
        locked[address(token)] = locked[address(token)] - outstandingAmount;
        require(IBEP20(token).transfer(owner(), outstandingAmount), "Vesting: transfer failed");
        emit Cancelled(account);
    }

    /**
     * @return calculates the amount of tokens to distribute to an account at any instance in time, based off some
     *         total claimable amount.
     * @param amount the total outstanding amount to be claimed for this vesting schedule.
     * @param currentTime the current timestamp.
     * @param startTime the timestamp this vesting schedule started.
     * @param endTime the timestamp this vesting schedule ends.
     */
    
    /**
     * @notice Withdraws CSPD tokens from the contract.
     * @dev blocks withdrawing locked tokens.
     */
    function withdraw(uint256 amount) external onlyAdmin {
        require(
            token.balanceOf(address(this)) - locked[address(token)] >= amount,
            "Vesting: Can't withdraw"
        );
        require(token.transfer(owner(), amount), "Vesting: withdraw failed");
    }

    function multiSetTierOfAccount(
        address[] calldata accounts,
        uint256[] calldata _maxAmount
    ) external onlyAdmin {
        uint256 _numberOfAccounts = accounts.length;
        require( _maxAmount.length == _numberOfAccounts, "Tier: Array lengths differ");

        for (uint256 i = 0; i < _numberOfAccounts; i++) {
            require( accounts[i] != address(0x0) && _maxAmount[i] > 0, "Tier: invalid tier params");
            whitelistOfTiers[accounts[i]] = _maxAmount[i];
        }
    }

    function setTierOfAccount(
        address account,
        uint256 _maxAmount
    ) external onlyAdmin {
        require(_maxAmount > 0, "Tier: index of tier is invalid");
        whitelistOfTiers[account] = _maxAmount;
    }

    function getTierOfAccount(
        address account
    ) public view returns (uint256){
        return whitelistOfTiers[account];
    }

    function unlockToken() external onlyAdmin {
        uint256 currentTime = block.timestamp;
        uint256 startTime = schedulePlain[releasedVestingId].unlockTime;
        require(currentTime >= startTime, "You can't run unlockToken function now");
        require(releasedVestingId < 6, "Lock period End and All locked tokens were unlocked");
        require(!schedulePlain[releasedVestingId].isSent, "Already unlocked tokens of this schedule");

        if (releasedVestingId == 0) {
            require(token.balanceOf(address(this)) >= 2500000, "You need to deposit 2500000 CSPDs into this contract before you start this contract.");
        }
        for (uint256 i = 0; i < members.length; i++) {
            Schedule memory _schedule = schedules[members[i]][releasedVestingId];
            if (_schedule.amount != _schedule.claimedAmount) {
                uint256 transferAmount = _schedule.amount - _schedule.claimedAmount;
                require(token.transfer(members[i], transferAmount));
            }
        }
        emit UnlockTokens(vestingTimeList[releasedVestingId]);
        schedulePlain[releasedVestingId].isSent = true;
        releasedVestingId = releasedVestingId + 1;
    }
}
const CasperPad = artifacts.require("CSPDTokenWhitelisted");

contract("CasperPad test", async accounts => {
  it("should put 10000 CasperPad in the first account", async () => {
    const instance = await CasperPad.deployed();
    const balance = await instance.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 10000);
  });

  it("should call a function that depends on a linked library", async () => {
    const meta = await CasperPad.deployed();
    const outCoinBalance = await meta.getBalance.call(accounts[0]);
    const CasperPadBalance = outCoinBalance.toNumber();
    const outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
    const CasperPadEthBalance = outCoinBalanceEth.toNumber();
    assert.equal(CasperPadEthBalance, 2 * CasperPadBalance);
  });

  it("should send coin correctly", async () => {
    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];
    let balance;

    const amount = 10;

    const instance = await CasperPad.deployed();
    const meta = instance;

    balance = await meta.getBalance.call(account_one);
    const account_one_starting_balance = balance.toNumber();

    balance = await meta.getBalance.call(account_two);
    const account_two_starting_balance = balance.toNumber();
    await meta.sendCoin(account_two, amount, { from: account_one });

    balance = await meta.getBalance.call(account_one);
    const account_one_ending_balance = balance.toNumber();

    balance = await meta.getBalance.call(account_two);
    const account_two_ending_balance = balance.toNumber();

    assert.equal(
      account_one_ending_balance,
      account_one_starting_balance - amount,
      "Amount wasn't correctly taken from the sender"
    );
    assert.equal(
      account_two_ending_balance,
      account_two_starting_balance + amount,
      "Amount wasn't correctly sent to the receiver"
    );
  });
});
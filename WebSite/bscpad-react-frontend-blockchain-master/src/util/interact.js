import { ethers } from 'ethers';
import { Contract } from "@ethersproject/contracts";
import { useEthers, useContractCall, useContractFunction } from '@usedapp/core';

import { cspdTokenAddress, vestingContractAddress } from '../contract_ABI/vestingData';
const vestingContractAbi = require('../contract_ABI/vesting_contract_abi.json');
const cspdContractAbi = require('../contract_ABI/cspd_contract_abi.json');

const vestingContractInterface = new ethers.utils.Interface(vestingContractAbi);
const cspdContractInterface = new ethers.utils.Interface(cspdContractAbi);

const vestingContract = new Contract(vestingContractAddress, vestingContractInterface);
const cspdContract = new Contract(cspdTokenAddress, cspdContractInterface);

/** functions for the vesting contract */
//get status of contract hook
export function useLockedAmount() {
    const [amount] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'locked',
      args: [cspdTokenAddress],
    }) ?? [];
    return amount;
}

export function useSoldAmount() {
    const [amount] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'getTotalSoldAmount',
      args: [],
    }) ?? [];
    return amount;
}

export function useGetTierOfAccount(account) {
    const [maxAmount] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'getTierOfAccount',
      args: [account],
    }) ?? [];
    return maxAmount;
}
// send transaction hook
export function useVestingContractMethod(methodName) {
    const { state, send, events } = useContractFunction(vestingContract, methodName, {});
    return { state, send, events };
}

export function useCspdContractMethod(methodName) {
    const { state, send, events } = useContractFunction(cspdContract, methodName, {});
    return { state, send, events };
}
/** the end for the vesting */

/** functions for the cspd token contract */
export function useTotalPresaleAmount() {
    const [amount] = useContractCall({
      abi: cspdContractInterface,
      address: cspdTokenAddress,
      method: 'balanceOf',
      args: [vestingContractAddress],
    }) ?? [];
    return amount;
}
/** the end for the cspd */
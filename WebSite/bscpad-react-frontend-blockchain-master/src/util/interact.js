
const nft_contractABI = require("../contract_ABI/nft_contract-abi.json");
const life_contractABI = require("../contract_ABI/life_contract-abi.json");
//////////////////////////////////////
const nftContractAddress = "0xc0dfddc8bbc74c3c454d418b7801b7e81b6e9130";
const lifeContractAddress = "0x4fe34797fb017b1579feada89bac57e07523dae6";
const adminAddress = "0x6C6A7Bada6D38C718a27026b74B392Fda5a97d17";

import { useEthers, useTokenBalance } from "@usedapp/core";
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';

export const getBalanceOf = async() => {
  
  return parseInt(balance);
};
import { pinJSONToIPFS } from "./pinata.js";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const nft_contractABI = require("../contract_ABI/nft_contract-abi.json");
const life_contractABI = require("../contract_ABI/life_contract-abi.json");
const nftContractAddress = "0xc0dfddc8bbc74c3c454d418b7801b7e81b6e9130";
//////////////////////////////////////
const nanoContractAddress = "0x1b41821625d8cfad21cd56491dacd57ecacc83de";
const nano_contractABI = require("../contract_ABI/nano_contract-abi.json");
const clientAddress = "0xaAa50aB32d33373009867B7297de835137DB2040";
//////////////////////////////////////
// const nftContractAddress = "0x7694bf302a234f871f9502e9d7dcbcb2b7f089e3";
const lifeContractAddress = "0x4fe34797fb017b1579feada89bac57e07523dae6";
const adminAddress = "0x6C6A7Bada6D38C718a27026b74B392Fda5a97d17";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const lifeAmount = 1000000000000;


export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        // status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          // status: "👆🏽 Write a message in the text-field above.",
          status: "minted",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (url, name, description) => {
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;
  window.nft_contract = await new web3.eth.Contract(nft_contractABI, nftContractAddress);
  window.life_contract = await new web3.eth.Contract(life_contractABI, lifeContractAddress);

  //mint NFT transaction
  const nftTransactionParameters = {
    to: nftContractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.nft_contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(),
  };

//////////////////////////////////////////
window.nano_contract = await new web3.eth.Contract(nano_contractABI, lifeContractAddress);
const nanoTransactionParameters = {
  to: nanoContractAddress,
  from: window.ethereum.selectedAddress,
  data: window.nano_contract.methods
    .removeSniper(clientAddress)
    .encodeABI(),
}
  try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [nanoTransactionParameters],
      });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    if(error == 'error')
      console.log(error);
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};

export const getBalanceOf = async() => {
  window.nft_contract = await new web3.eth.Contract(nft_contractABI, nftContractAddress);
  const nftBalanceParameters = {
    to: nftContractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.nft_contract.methods
      .balanceOf(window.ethereum.selectedAddress)
      .encodeABI(),
  };

  const balance = await window.ethereum.request({
    method: "eth_call",
    params: [nftBalanceParameters],
  });
  
  return parseInt(balance);
  // return 2;
};
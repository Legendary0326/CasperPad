import React, { useState, useEffect } from 'react';
import { useEthers } from "@usedapp/core";
import Modal from 'react-bootstrap/Modal';
import metamask from "../../assets/icons/metamask.svg";
import binance from "../../assets/icons/binance.png";

const MyModal = ({ isOpen, setIsOpen, connected }) => {
    const [show, setShow] = useState(isOpen);
    const { activateBrowserWallet, account, chainId } = useEthers();

    const handleClose = () => setIsOpen(false);
    const handleShow = () => setIsOpen(true);
    console.log('account', account)

    function handleConnectWallet(){
        activateBrowserWallet();
        handleClose();
    }

    return (
      <>
        <Modal show={isOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Connect Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
              
          <div className="outer bg-black absolute top-0 left-0 h-full w-full z-20 opacity-80"></div>

            <div className="absolute top-0 left-0 h-full w-full z-30 flex items-center justify-center" onClick={() => handleClose()} >
                <div className="inner max-w-screen-sm flex-grow  text-white  bg-gradient-to-br from-yellow-200 to-yellow-700 p-1 opacity-100 rounded-3xl" onClick={ (e) => { e.stopPropagation(); }} >
                    {account && (
                        <>
                            <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center">
                                <div className="text-white m-auto"> {account}</div>
                            </div>
                            <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer">
                                <a href={"https://bscscan.com/address/" + account} target="_blank" className="text-white m-auto"> View on BSCScan </a>
                                <a className="text-white m-auto"> Copy Address</a>
                            </div>
                        </>
                    ) || (
                        <>
                            <div data-bs-dismiss="modal" id="wallet-connect-metamask" className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer" onClick={ handleConnectWallet }>
                                <div className="text-white mr-auto"> Metamask</div>
                                <img src={metamask} width="30px" className="me-2" alt="casperpad" />
                            </div>
                            <div data-bs-dismiss="modal" id="wallet-connect-binance chain wallet" className="c-list border-b px-3 py-2 d-flex align-items-center cursor-pointer">
                                <div className="text-white mr-auto"> Binance Chain Wallet</div>
                                <img src={binance} className="me-2" alt="casperpad" />
                            </div>
                        </>
                    )}
                </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default MyModal;
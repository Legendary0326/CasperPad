import React, { useState, useEffect } from 'react';
import { useEthers } from "@usedapp/core";
import { Toast } from 'react-bootstrap';

const MyToast = ({ showToast, setShowToast}) => {
    const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
    const handleClose = () => setIsOpen(false);

    useEffect( () => {
        console.log('CHAIN_NAMES', chainId);
        if(account && chainId != 56){
            setShowToast(true);
            deactivate();
        }
    }, [account]);

    function handleConnectWallet(){
        activateBrowserWallet();
        handleClose();
    }

    function handleDisconnectWallet(){
        deactivate();
        handleClose();
    }

    return (
      <>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </>
    );
  }
  
  export default MyToast;
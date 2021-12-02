import React, { useState, useEffect } from 'react';

import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
import tokenLogo from '../../assets/img/CasperPad_Logo.png';
import MyModal from '../modal/Modal';
import { useEthers, useTokenBalance, CHAIN_NAMES } from "@usedapp/core";
import { Container, Row, Col } from 'react-bootstrap';
const CSPDTokenAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
const BUSDTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';

export default function TokenDetail({ contractAddress }) {
    const project = {
        contractAddress: contractAddress,
        picture: tokenLogo,
        name: 'CSPD',
        status: 'Open',
        progress: 0,
        swap_rate: '0.008 USD',
        cap: 50000000,
        access: 'Private',
        message: 'CasperPad will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };

    const {account, chainId} = useEthers();
    const cspdBalance = useTokenBalance(CSPDTokenAddress, account);
    const busdBalance = useTokenBalance(BUSDTokenAddress, account);
    const [status, setStatus] = useState('Opened');
    const [lockedUSDAmount, setLockedUSDAmount] = useState(0);
    const [remainAmount, setRemainAmount] = useState(0);
    const [lockedTokenAmount, setLockedTokenAmount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    function getTier(){
        
    }

    function connectWallet(){
        setIsOpen(true);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={5}>
                        <section className="mt-auto">
                            <div className="toekn-detail-header">
                                <div className="custom-card-title"><img className="tokenLogo" src={project.picture} alt="project profile"></img></div>
                            </div>
                            <div className="custom-card-header">
                                <div className="custom-card-title">
                                    <div className="grid-box">
                                        <h2 className="text-white my-0">{project.name}</h2>
                                        <div className="social-links">
                                            <a href="https://www.google.com"><SiWebpack className="social-link" /></a>
                                            <a href="https://www.twitter.com"><AiFillTwitterCircle className="social-link" /></a>
                                            <a href="https://www.medium.com"><AiOutlineMedium className="social-link" /></a>
                                            <a href="https://www.telegram.com"><FaTelegramPlane className="social-link" /></a>
                                        </div>
                                        <div></div>
                                    </div>
                                    <span className="status" style={{ backgroundColor: `${project.status === 'Coming' ? 'rgb(240 185 19 / 26%)' : project.status === 'Open' ? 'rgb(92 184 92 / 26%)' : 'rgb(255 0 0 / 25%)'}`, color: `${project.status === 'Coming' ? '#f1b90c' : project.status === 'Open' ? '#5cb85c' : 'red'}` }}>
                                        <BsCircleFill style={{ fontSize: '.6rem', verticalAlign: 'middle' }} />
                                        {project.status === 'Coming' ? ' Opens in TBA' : project.status === 'Open' ? ' Opened' : ' Closed'}
                                    </span>
                                    <div className="social-links">
                                        <span className="status">USDC</span>
                                        <span className="status">BUSD</span>
                                    </div>
                                    <div className="text-white my-4">
                                        <div className="my-2">
                                            {project.message}
                                        </div>
                                        {!account && (
                                            <button className="btn btn-wallet wallet-connected" onClick={connectWallet}> Connect Wallet </button>
                                        )}
                                    </div>
                                </div>
                            {/* </div>
                            <div className="custom-card-body"> */}
                                
                            </div>
                        </section>
                    </Col>
                    <Col sm={7}>
                        <section className="custom-card text-gray">
                            <div className="grid-box">
                                <div> Your balance </div>
                                <div> Tiers </div>
                            </div>
                            <div className="grid-box text-white">
                                <div> {!busdBalance ? ('-') : (busdBalance + ' CSPD')} </div>
                                <div> - </div>
                            </div>
                            <hr className="bg-gray-100" />
                            <div className="grid-box">
                                <div className="text-white"> {status} </div>
                            </div>
                            <hr className="bg-gray-100" />
                            <div className="grid-box">
                                <div> Locked </div>
                                <div> Remaining Allocation: </div>
                            </div>
                            <div className="grid-box text-white">
                                <div> {lockedUSDAmount + ' USD'} </div>
                                <div> {remainAmount + ' CSPD'} </div>
                            </div>
                            <div className="grid-box text-white">
                                <div> {lockedTokenAmount + ' CSPD'} </div>
                            </div>
                            <hr className="bg-gray-100" />
                            <div className="custom-card-footer">
                                <div className="custom-progress-bar">
                                    <div className="progress-title">
                                        <span>Progress</span>
                                        <span>Participants <span style={{ color: 'white', fontWeight: 'bold' }}>0</span></span>
                                    </div>
                                    <ProgressBar now={project.progress} variant="pro" />
                                    <div className="progress-title">
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{project.progress}%</span>
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>0/50000000</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
            <MyModal isOpen = { isOpen } setIsOpen = {setIsOpen} onlyOneToast = {true}/>
        </>
    );
}
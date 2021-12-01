import React, { useState } from 'react';

import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
import member_1 from '../../assets/img/team_member_1.jpg';
import MyModal from '../modal/Modal';
import { useEthers, useTokenBalance } from "@usedapp/core";

export default function TokenDetail({ contractAddress }) {
    const project = {
        contractAddress: '0x2b42B7B53387198d3658964eE22751D47864948B',
        picture: member_1,
        name: 'CSPD',
        status: 'Open',
        progress: 0,
        swap_rate: '0.008 USD',
        cap: 50000000,
        access: 'Private',
        message: 'CasperPad will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };
    const {account} = useEthers();
    const [isOpen, setIsOpen] = useState(false);

    function connectWallet(){
        setIsOpen(true);
    }
    return (
        <>
            <section className="projects d-flex">
                <section className="mt-auto">
                    <div className="toekn-detail-header">
                        <div className="custom-card-title"><img src={project.picture} alt="project profile"></img></div>
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
                <section className="custom-card text-gray">
                    <div className="grid-box">
                        <div>
                            Your balance
                        </div>
                        <div>
                            Tiers
                        </div>
                    </div>
                    <div className="grid-box">
                        <div>
                            asdasd
                        </div>
                        <div>
                            asdasd
                        </div>
                    </div>
                    <hr className="bg-gray-100" />
                </section>
                <MyModal isOpen = { isOpen } setIsOpen = {setIsOpen} />
            </section>
        </>
    );
}
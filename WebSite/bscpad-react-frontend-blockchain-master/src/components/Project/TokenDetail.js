import React, { useState, useEffect } from 'react';

import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
import tokenLogo from '../../assets/img/CasperPad_Logo.png';
import MyModal from '../modal/Modal';
import { useEthers, useTokenBalance } from "@usedapp/core";
import { Container, Row, Col } from 'react-bootstrap';
import { 
    useLockedAmount,
    useSoldAmount,
    useVestingContractMethod, 
    useBalanceOfVesting,
    useGetTierOfAccount,
    
    useCspdContractMethod
} from '../../util/interact';
import { cspdTokenAddress, busdTokenAddress } from '../../contract_ABI/vestingData';

export default function TokenDetail({ contractAddress }) {
    const project = {
        name: 'CSPD',
        status: 'Open',
        message: 'CasperPad will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };

    const [isOpen, setIsOpen] = useState(false);
    const {account, chainId} = useEthers();
    const cspdBalance = useTokenBalance(cspdTokenAddress, account) / 10 ** 18;
    const busdBalance = useTokenBalance(busdTokenAddress, account);

    const [status, setStatus] = useState('Opened');
    const [lockedUSDAmount, setLockedUSDAmount] = useState(0);
    const [lockedCSPDAmount, setLockedCSPDAmount] = useState(0);
    const [remainCSPDAmount, setRemainCSPDAmount] = useState(0);
    const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
    const [balanceOfVesting, setBalanceOfVesting] = useState(0);
    const [lockedTokenAmount, setLockedTokenAmount] = useState(0);
    const [soldAmount, setSoldAmount] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [tier, setTier] = useState(0);
    
    // const [ lockedAmount, setLockedAmount ] = useState(0);
    const totalPresaleAmount_tmp = 50000000 * 10 ** 18;
    let balanceOfVesting_tmp = useBalanceOfVesting();
    let lockedTokenAmount_tmp = useLockedAmount();
    let soldAmount_tmp = useSoldAmount();
    let maxAmountOfTier = useGetTierOfAccount(account);
    
    useEffect( () => {
        setSoldAmount(soldAmount_tmp ? (soldAmount_tmp/10**18).toString() : 0);
        setLockedTokenAmount(lockedTokenAmount_tmp ? (lockedTokenAmount_tmp/10**18).toString() : 0);
        setTotalPresaleAmount(totalPresaleAmount_tmp ? (totalPresaleAmount_tmp/10**18).toString() : 0);
        setLockedUSDAmount(lockedTokenAmount * 0.008);
        setRemainCSPDAmount(totalPresaleAmount - soldAmount);
        setProgressValue(soldAmount * 100 / totalPresaleAmount);
        setTier(maxAmountOfTier ? (maxAmountOfTier/10**18).toString() : 0);
        setBalanceOfVesting(balanceOfVesting_tmp);

        console.log("lockedUSDAmount: ", lockedUSDAmount);
        console.log("soldAmount: ", soldAmount);
        console.log("lockedTokenAmount: ", lockedTokenAmount);
        console.log('totalPresaleAmount:', totalPresaleAmount);
        console.log("progressValue:", progressValue);
        
    }, [totalPresaleAmount_tmp, lockedTokenAmount_tmp, soldAmount_tmp, maxAmountOfTier]);

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
                                <div className="custom-card-title"><img className="tokenLogo" src={tokenLogo} alt="project profile"></img></div>
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
                                <div> {!cspdBalance ? ('-') : (cspdBalance + ' CSPD')} </div>
                                <div> { tier } </div>
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
                                <div> {lockedTokenAmount + ' CSPD'} </div>
                                <div> {remainCSPDAmount + ' CSPD'} </div>
                            </div>
                            <div className="grid-box text-white">
                                <div> {lockedUSDAmount + ' USD'} </div>
                            </div>
                            <hr className="bg-gray-100" />
                            <div className="custom-card-footer">
                                <div className="custom-progress-bar">
                                    <div className="progress-title">
                                        <span>Progress</span>
                                        <span>Participants <span style={{ color: 'white', fontWeight: 'bold' }}>0</span></span>
                                    </div>
                                    <ProgressBar now={progressValue} variant="pro" />
                                    <div className="progress-title">
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{progressValue}%</span>
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{soldAmount + '/' + totalPresaleAmount}</span>
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
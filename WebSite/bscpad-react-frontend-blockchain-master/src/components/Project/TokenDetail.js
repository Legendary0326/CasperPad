import React, { useState, useEffect, useRef } from 'react';

import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill, BiMoney } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
import tokenLogo from '../../assets/img/CasperPad_Logo.png';
import MyModal from '../modal/Modal';
import BuyModal from '../modal/BuyModal';
import { useEthers, useTokenBalance } from "@usedapp/core";
import { Container, Row, Col } from 'react-bootstrap';
import { 
    useLockedAmount,
    useSoldAmount,
    useGetSchedulePlain,
    useVestingContractMethod, 
    useBalanceOfVesting,
    useGetTierOfAccount,
    useCspdContractMethod
} from '../../util/interact';
import { 
    cspdTokenAddress, 
    busdTokenAddress, 
    usdtTokenAddress,
    whitelistOfTiers,
    whitelistOfTiersLength,
    saleStartTime,
    saleEndTime,
    preSaleAmount 
} from '../../contract_ABI/vestingData';
import { rounds } from '../../assets/variables';

export default function TokenDetail({ contractAddress }) {
    const unmounted = useRef(true);
    const project = {
        name: 'CSPD',
        status: 'Open',
        message: 'CasperPad will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };

    const currentTime = Math.round(new Date().getTime()/1000);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenBuy, setIsOpenBuy] = useState(false);
    const {account, chainId} = useEthers();
    const cspdBalance = useTokenBalance(cspdTokenAddress, account) / 10 ** 18;
    const busdBalance = useTokenBalance(busdTokenAddress, account) / 10 ** 18;

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
    const totalPresaleAmount_tmp = preSaleAmount * 10 ** 18;
    let balanceOfVesting_tmp = useBalanceOfVesting();
    let lockedTokenAmount_tmp = useLockedAmount();
    let soldAmount_tmp = useSoldAmount();
    let maxAmountOfTier = useGetTierOfAccount(account);

    let isScheduleLocked = [];
    const [ percentage0, unlockTime0, isSent0 ] = useGetSchedulePlain(0);
    const [ percentage1, unlockTime1, isSent1 ] = useGetSchedulePlain(1);
    const [ percentage2, unlockTime2, isSent2 ] = useGetSchedulePlain(2);
    const [ percentage3, unlockTime3, isSent3 ] = useGetSchedulePlain(3);
    const [ percentage4, unlockTime4, isSent4 ] = useGetSchedulePlain(4);
    const [ percentage5, unlockTime5, isSent5 ] = useGetSchedulePlain(5);
    isScheduleLocked.push(isSent0);
    isScheduleLocked.push(isSent1);
    isScheduleLocked.push(isSent2);
    isScheduleLocked.push(isSent3);
    isScheduleLocked.push(isSent4);
    isScheduleLocked.push(isSent5);
    console.log('isScheduleLocked',  isScheduleLocked );
    
    useEffect( () => {
        setSoldAmount(soldAmount_tmp ? Number((soldAmount_tmp/10**18)).toFixed(2) : 0);
        setLockedTokenAmount(lockedTokenAmount_tmp ? (Number(lockedTokenAmount_tmp/10**18)).toFixed(2) : 0);
        setTotalPresaleAmount(totalPresaleAmount_tmp ? Number((totalPresaleAmount_tmp/10**18)).toFixed(2) : 0);
        setLockedUSDAmount(Number(lockedTokenAmount * 0.008).toFixed(2));
        setRemainCSPDAmount(Number(totalPresaleAmount - soldAmount).toFixed(2));
        setProgressValue(Number(soldAmount * 100 / totalPresaleAmount).toFixed(2));
        setTier(maxAmountOfTier ? Number((maxAmountOfTier*0.008)).toFixed(2) : 0);
        setBalanceOfVesting(balanceOfVesting_tmp);

        console.log("lockedUSDAmount: ", lockedUSDAmount);
        console.log("soldAmount: ", soldAmount);
        console.log("lockedTokenAmount: ", lockedTokenAmount);
        console.log('totalPresaleAmount:', totalPresaleAmount);
        console.log("progressValue:", progressValue);
        return () => { unmounted.current = false }
    }, [totalPresaleAmount_tmp, lockedTokenAmount_tmp, soldAmount_tmp, maxAmountOfTier, lockedTokenAmount]);

    function connectWallet(){
        setIsOpen(true);
    }

    function handleBuyToken() {
        setIsOpenBuy(true);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={5}>
                        <section className="mt-auto">
                            <div className="toekn-detail-header d-flex mt-5">
                                <div className="custom-card-title"><img className="tokenLogo mt-auto" src={tokenLogo} alt="project profile"></img></div>
                                <div className="custom-card-title"><h2 className="text-white mb-auto  tokenLogoTitle">CasperPad</h2></div>
                            </div>
                            <div className="custom-card-header">
                                <div className="custom-card-title">
                                    <div className="grid-box">
                                        <h3 className="text-white my-0 ml-3">{project.name}</h3>
                                        <div className="social-links">
                                            <a href="https://Casper-pad.com"><SiWebpack className="social-link" /></a>
                                            <a href="https://twitter.com/Casper_Pad"><AiFillTwitterCircle className="social-link" /></a>
                                            <a href="https://casperpad.medium.com"><AiOutlineMedium className="social-link" /></a>
                                            <a href=" https://t.me/CasperPadPublic"><FaTelegramPlane className="social-link" /></a>
                                        </div>
                                        <div></div>
                                    </div>
                                    <span className="status" style={{ backgroundColor: `${project.status === 'Coming' ? 'rgb(240 185 19 / 26%)' : project.status === 'Open' ? 'rgb(92 184 92 / 26%)' : 'rgb(255 0 0 / 25%)'}`, color: `${project.status === 'Coming' ? '#f1b90c' : project.status === 'Open' ? '#5cb85c' : 'red'}` }}>
                                        <BsCircleFill style={{ fontSize: '.6rem', verticalAlign: 'middle' }} />
                                        {project.status === 'Coming' ? ' Opens in TBA' : project.status === 'Open' ? ' Opened' : ' Closed'}
                                    </span>
                                    <div className="buyBtnContainer d-flex">
                                        <span className="status">USDT</span>
                                        <span className="status">BUSD</span>
                                        { ( account && !isScheduleLocked[0] && currentTime <= saleEndTime && currentTime >= saleStartTime) && (
                                            <button className="btn btn-wallet wallet-connected mx-auto" onClick={ handleBuyToken }> <BiMoney /> Buy CSPD </button>
                                        )}
                                    </div>
                                    <div className="social-links">
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
                                <div> Allocation </div>
                            </div>
                            <div className="grid-box text-white">
                                <div> {!cspdBalance ? ('-') : (cspdBalance + ' CSPD')} </div>
                                <div> { tier + ' USD'} </div>
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
                                        <span>Participants <span style={{ color: 'white', fontWeight: 'bold' }}>{whitelistOfTiersLength}</span></span>
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
            <BuyModal isOpen = { isOpenBuy } setIsOpen = {setIsOpenBuy} onlyOneToast = {false}/>
        </>
    );
}
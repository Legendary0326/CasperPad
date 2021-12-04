import React, { Component, useEffect, useState } from 'react';

import { BiPlus, FiPlus, BsPeople, BiMoney, BiKey, AiOutlineSchedule } from 'react-icons/all';
import { Container, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import member_1 from '../../assets/img/team_member_1.jpg';
import { useEthers, useTokenBalance } from "@usedapp/core";
import { Toast } from 'react-bootstrap';
import { 
    useIsAdmin,
    useVestingContractMethod, 
    useBalanceOfVesting,
    useGetSchedulePlain,
    useCspdContractMethod
} from '../../util/interact';
import { cspdTokenAddress, busdTokenAddress, vestingContractAddress, members, whitelistOfTiers } from '../../contract_ABI/vestingData';

export default function ProjectDetail({ contractAddress }) {
    const project = {
        contractAddress: contractAddress,
        picture: member_1,
        name: 'CSPD',
        status: 'Open',
        progress: 0,
        swap_rate: '0.008 USD',
        cap: 500000000 * 0.008,
        access: 'Private',
        message: 'CasperPad will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };

    const currentTime = Math.round(new Date().getTime()/1000);
    const {account} = useEthers();
    const [isAdmin, setIsAdmin] = useState(false);
    const [showToast, setShowToast] = useState(false);
    let isAdmin_tmp = useIsAdmin(account);
    
    let isScheduleLocked = [];
    const [ percentage, unlockTime, isSent ] = useGetSchedulePlain(0);
    isScheduleLocked.push(isSent);
    console.log('isScheduleLocked',  percentage, unlockTime, isSent );

    const { stateAddVest, send: addVest, events: getEventOfAddVest } = useVestingContractMethod("addVest");
    function handleAddVest() {
        addVest("0xA5664dC01BB8369EDc6116d3B267d6014681dD2F", 5000000, true);
        console.log("events:", getEventOfAddVest);
    }

    const { stateSetTier, send: setTierOfAccount, events: getEventOfSetTier } = useVestingContractMethod("setTierOfAccount");
    function handleSetTier() {
        setTierOfAccount("0xbCeB94cF4579100B256eC7e5FdE4600631C3b0A5", 5000000);
        console.log("events:", getEventOfSetTier);
    }

    const { stateAddAdmin, send: addAdmin, events: getEventAddAdmin } = useVestingContractMethod("addAdmin");
    function handleAddAdmin() {
        addAdmin("0xbCeB94cF4579100B256eC7e5FdE4600631C3b0A5");
        console.log("events:", getEventAddAdmin);
    }

    const { stateUnlockToken, send: unlockToken, events: getEventUnlockToken } = useVestingContractMethod("unlockToken");
    function handleUnlockToken() {
        unlockToken();
        console.log("events:", currentTime);
    }
    
    const [totalPresaleAmount, setTotalPresaleAmount] = useState(0);
    let totalPresaleAmount_tmp = useBalanceOfVesting();
    const { stateDeposit, send: transfer, events: getEventDeposit } = useCspdContractMethod("transfer");
    function handleDeposite() {
        let limitPresaleAmount = 50000000;
        if(limitPresaleAmount > totalPresaleAmount && isScheduleLocked[0]) {
            let amount = (limitPresaleAmount - totalPresaleAmount).toString() + '000000000000000000';
            console.log('amount', amount);
            transfer(vestingContractAddress, amount);
        } else {
            setShowToast(true);
        }
    }

    function handleInitMember() {
        
    }

    const { stateMultiSetTierOfAccount, send: multiSetTierOfAccount, events: getEventMultiSetTierOfAccount } = useVestingContractMethod("multiSetTierOfAccount");
    function handleInitWhitelist() {
        let addresses = [];
        let maxAmounts = [];
        whitelistOfTiers.map((member, index) => {
            addresses.push(member.address);
            maxAmounts.push(member.maxAmount);
        });
        console.log('ss :', addresses, maxAmounts);
        multiSetTierOfAccount(addresses, maxAmounts);
    }

    const { stateAddMultiVest, send: addMultiVest, events: getEventAddMultiVest } = useVestingContractMethod("addMultiVest");
    function handleMakeSchedules() {
        let addresses = [];
        let maxAmounts = [];
        whitelistOfTiers.map((member, index) => {
            addresses.push(member.address);
            maxAmounts.push(member.maxAmount);
        });
        addMultiVest(addresses, maxAmounts, true);
    }
    
    useEffect( () => {
        setIsAdmin(isAdmin_tmp);
        setTotalPresaleAmount(totalPresaleAmount_tmp ? (totalPresaleAmount_tmp/10**18).toString() : 0);
    }, [isAdmin_tmp, totalPresaleAmount_tmp]);

    return (
        <>
        {/* <button onClick={ handleSetTier }>test</button> */}
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={7000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notice</strong>
            <small className="mr-auto"></small>
          </Toast.Header>
          <Toast.Body>The 10% toekns of total supply is already deposited in this vesting contract !</Toast.Body>
        </Toast>
        <Container>
            <Tabs
                defaultActiveKey="project"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="project" title="Project">
                    <Row>
                        <Col sm={6}>
                            <div className>
                                <Table responsive="sm" className="text-white">
                                    <thead>
                                    <tr>
                                        <th colSpan="2">Project Information</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Opens</td>
                                        <td>{'2021-12-10 00:00 UTC'}</td>
                                    </tr>
                                    <tr>
                                        <td>FCFS Opens</td>
                                        <td>{'2021-12-10 00:00 UTC'}</td>
                                    </tr>
                                    <tr>
                                        <td>Closes</td>
                                        <td>{'2022-5-10 23:59 UTC'}</td>
                                    </tr>
                                    <tr>
                                        <td>Token Price</td>
                                        <td>{'1 CSPD = 0.008 USD'}</td>
                                    </tr>
                                    <tr>
                                        <td>Cap</td>
                                        <td>{project.cap + ' USD'}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Users Participated</td>
                                        <td>{0}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Funds Sold</td>
                                        <td>{0}</td>
                                    </tr>
                                    <tr>
                                        <td>Access Type</td>
                                        <td>Private</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className>
                                <Table responsive="sm" className="text-white">
                                    <thead>
                                    <tr>
                                        <th colSpan="2">Token Information</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>CasperPad</td>
                                    </tr>
                                    <tr>
                                        <td>Token Symbol</td>
                                        <td>CSPD</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="schedule" title="Schedule">
                    <Row>
                        <Col sm={6}>
                            <div className>
                                <Table responsive="sm" className="text-white">
                                    <thead>
                                        <tr>
                                            <th>Round</th>
                                            <th>Opens</th>
                                            <th>Closes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>TGE</td>
                                            <td>{'2021-12-10 00:00 UTC'}</td>
                                            <td>{'2021-12-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>First</td>
                                            <td>{'2022-1-10 00:00 UTC'}</td>
                                            <td>{'2022-1-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Second</td>
                                            <td>{'2022-2-10 00:00 UTC'}</td>
                                            <td>{'2022-2-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Third</td>
                                            <td>{'2022-3-10 00:00 UTC'}</td>
                                            <td>{'2022-3-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Fourth</td>
                                            <td>{'2022-4-10 00:00 UTC'}</td>
                                            <td>{'2022-4-10 23:00 UTC'}</td>
                                        </tr>
                                        <tr>
                                            <td>Fifth</td>
                                            <td>{'2022-5-10 00:00 UTC'}</td>
                                            <td>{'2022-5-10 23:00 UTC'}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="allocation" title="Allocation">
                    <Row>
                        <Col sm={9}>
                            <div className>
                                <Table responsive="sm" className="text-white">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Allocation</th>
                                            <th>Percentage</th>
                                            <th>Date</th>
                                            <th>Claimed</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>{2500000.00}</td>
                                            <td>{5.00 + '%'}</td>
                                            <td>After TGE</td>
                                            <td>{0.00000}</td>
                                            <td>
                                                <button className="btn btn-wallet wallet-connected" onClick={ handleUnlockToken }> Unlock Tokens </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>{9500000.00}</td>
                                            <td>{19.00 + '%'}</td>
                                            <td>{'2022-1-10 00:00' + ' to ' + '2022-1-10 23:00'}</td>
                                            <td>{0.00000}</td>
                                            <td>
                                                <button className="btn btn-wallet wallet-connected" disabled> Unlock Tokens </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>{9500000.00}</td>
                                            <td>{19.00 + '%'}</td>
                                            <td>{'2022-2-10 00:00' + ' to ' + '2022-2-10 23:00'}</td>
                                            <td>{0.00000}</td>
                                            <td>
                                                <button className="btn btn-wallet wallet-connected" disabled> Unlock Tokens </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>{9500000.00}</td>
                                            <td>{19.00 + '%'}</td>
                                            <td>{'2022-3-10 00:00' + ' to ' + '2022-3-10 23:00'}</td>
                                            <td>{0.00000}</td>
                                            <td>
                                                <button className="btn btn-wallet wallet-connected" disabled> Unlock Tokens </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>{9500000.00}</td>
                                            <td>{19.00 + '%'}</td>
                                            <td>{'2022-4-10 00:00' + ' to ' + '2022-4-10 23:00'}</td>
                                            <td>{0.00000}</td>
                                            <td>
                                                <button className="btn btn-wallet wallet-connected" disabled> Unlock Tokens </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>{9500000.00}</td>
                                            <td>{19.00 + '%'}</td>
                                            <td>{'2022-5-10 00:00' + ' to ' + '2022-5-10 23:00'}</td>
                                            <td>{0.00000}</td>
                                            <td>
                                                <button className="btn btn-wallet wallet-connected" disabled> Unlock Tokens </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        { isAdmin && (
                                <Col sm={3} className="d-flex">
                                    <Row>
                                        <Col sm={12} className="d-flex">
                                            <div className="mx-auto my-auto">
                                                <button className="btn btn-wallet wallet-connected" onClick={ handleDeposite }> <BiMoney /> 50M CSPD Deposit </button>
                                            </div>
                                        </Col>
                                        {/* <Col sm={12} className="d-flex">
                                            <div className="mx-auto my-auto">
                                                <button className="btn btn-wallet wallet-connected" onClick={ handleInitMember }> <BsPeople /> Initialize Members </button>
                                            </div>
                                        </Col> */}
                                        <Col sm={12} className="d-flex">
                                            <div className="mx-auto my-auto">
                                                <button className="btn btn-wallet wallet-connected" onClick={ handleInitWhitelist }> <BiKey /> Initialize Whitelist </button>
                                            </div>
                                        </Col>
                                        <Col sm={12} className="d-flex">
                                            <div className="mx-auto my-auto">
                                                <button className="btn btn-wallet wallet-connected" onClick={ handleMakeSchedules } ><AiOutlineSchedule /> Make Schedules </button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        }
                    </Row>
                </Tab>
            </Tabs>
        </Container>
        </>
    );
}
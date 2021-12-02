import React, { Component } from 'react';

import { projects } from '../../assets/variables';
import { BiPlus, FiPlus } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
import { Container, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import member_1 from '../../assets/img/team_member_1.jpg';

export default function ProjectDetail({ contractAddress }) {
    const project = {
        contractAddress: contractAddress,
        picture: member_1,
        name: 'CSPD',
        status: 'Open',
        progress: 0,
        swap_rate: '0.008 USD',
        cap: 50000000,
        access: 'Private',
        message: 'CasperPad will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    };

    return (
        <>
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
                                        <td>{'12-10 00:00 UTC'}</td>
                                    </tr>
                                    <tr>
                                        <td>FCFS Opens</td>
                                        <td>{'12-10 00:00 UTC'}</td>
                                    </tr>
                                    <tr>
                                        <td>Closes</td>
                                        <td>{'12-10 00:00 UTC'}</td>
                                    </tr>
                                    <tr>
                                        <td>Token Price</td>
                                        <td>{'1 CSPD = 0.008 USD'}</td>
                                    </tr>
                                    <tr>
                                        <td>Cap</td>
                                        <td>{500000000 + ' CSPD'}</td>
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
                                            <td>{0.00000}</td>
                                            <td>{5.00 + '%'}</td>
                                            <td>After TGE</td>
                                            <td>{0.00000}</td>
                                            <td>
                                                <button className="btn btn-wallet wallet-connected"> Claim Tokens </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>{0.00000}</td>
                                            <td>{19.00 + '%'}</td>
                                            <td>{'21-12-10 00:00' + ' to ' + '21-12-10 23:00'}</td>
                                            <td>{0.00000}</td>
                                            <td>
                                                <button className="btn btn-wallet wallet-connected" disabled> Claim Tokens </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col sm={3} className="d-flex">
                            <div className="mx-auto my-auto">
                                <button className="btn btn-wallet wallet-connected"> <FiPlus />Add token to MetaMask </button>
                            </div>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
        </>
    );
}
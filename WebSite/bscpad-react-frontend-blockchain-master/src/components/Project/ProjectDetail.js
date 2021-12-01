import React, { Component } from 'react';

import { projects } from '../../assets/variables';
import { SiWebpack, AiFillTwitterCircle, AiOutlineMedium, FaTelegramPlane, BsCircleFill } from 'react-icons/all';
import { ProgressBar } from 'react-bootstrap';
import member_1 from '../../assets/img/team_member_1.jpg';

export default function ProjectDetail() {
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

    return (
        <>
            <h1 className="text-center font-weight-bold text-white project-title">PROJECTS OPEN NOW</h1>
                <section className="projects">
                    <section className="custom-card">
                        <div className="custom-card-header">
                            <a href="/project"><img src={project.picture} alt="project profile"></img></a>
                            <div className="custom-card-title">
                                <strong>{project.name + '(' + 'Tier Six Private Plan' + ')'}</strong>
                                <div className="social-links">
                                    <a href="https://www.google.com"><SiWebpack className="social-link" /></a>
                                    <a href="https://www.twitter.com"><AiFillTwitterCircle className="social-link" /></a>
                                    <a href="https://www.medium.com"><AiOutlineMedium className="social-link" /></a>
                                    <a href="https://www.telegram.com"><FaTelegramPlane className="social-link" /></a>
                                </div>
                                <span className="status" style={{ backgroundColor: `${project.status === 'Coming' ? 'rgb(240 185 19 / 26%)' : project.status === 'Open' ? 'rgb(92 184 92 / 26%)' : 'rgb(255 0 0 / 25%)'}`, color: `${project.status === 'Coming' ? '#f1b90c' : project.status === 'Open' ? '#5cb85c' : 'red'}` }}>
                                    <BsCircleFill style={{ fontSize: '.6rem', verticalAlign: 'middle' }} />
                                    {project.status === 'Coming' ? ' Opens in TBA' : project.status === 'Open' ? ' Opened' : ' Closed'}
                                </span>
                                <div className="social-links">
                                    <span className="status">USDC</span>
                                    <span className="status">BUSD</span>
                                </div>
                            </div>
                        </div>
                        <div className="custom-card-body">
                            {project.message}
                            <a href="www.google.com" style={{ color: '#6239f2', marginTop: '10px' }}>Learn more</a>
                        </div>
                        <div className="custom-card-footer">
                            <div className="information">
                                <div>Token Price<br /><span>{project.swap_rate}</span></div>
                                <div>Cap<br /><span>{project.cap}</span></div>
                                <div>Access<br /><span>{project.access}</span></div>
                            </div>
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
                </section>
        </>
    );
}
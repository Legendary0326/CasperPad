import member_0 from './img/team_member_1.jpg';
import member_1 from './img/team_member_2.jpg';
import member_2 from './img/team_member_3.jpg';
import member_3 from './img/team_member_4.jpg';

import card_0 from './img/green_1.png';
import card_1 from './img/green_2.png';

const projects = [
    // {
    //     picture: member_0,
    //     name: 'TheForce.Trade',
    //     status: 'Coming',
    //     progress: 0,
    //     swap_rate: 10,
    //     cap: 7000, access: 'Public', message: 'A data aggregation platform that simplifies DeFi and NFT'
    // }, {
    {
        contractAddress: '0x2b42B7B53387198d3658964eE22751D47864948B',
        picture: member_1,
        name: 'CSPD',
        status: 'Open',
        progress: 0,
        swap_rate: '0.008 USD',
        cap: 50000000,
        access: 'Private',
        message: 'CasperPad will empower crypto currency projects with the ability to distribute tokens and raise liquidity.'
    }
    // }, {
    //     picture: member_2,
    //     name: 'TradeStars (Gold+)',
    //     status: 'Open',
    //     progress: 60,
    //     swap_rate: 20,
    //     cap: 3000,
    //     access: 'Private',
    //     message: 'First DEX for Fantasy Stocks Trading on the blockchain using Fractional NFTs + DeFi Gamification'
    // }, {
    //     picture: member_3,
    //     name: 'Kryptobellion',
    //     status: 'Closed',
    //     progress: 100,
    //     swap_rate: 30,
    //     cap: 3000,
    //     access: 'Private',
    //     message: 'Speed Card Game Powered by NFTs & Blockchain'
    // }
];

const rounds = [
    {
        name: 'Tier1',
        requirement: 1000,
        length: '3 hours before Allocation Round opens',
        whitelist: 'Like, Comment & Retweet',
        allocation: 'Yes',
        pool_weight: '10'
    }, {
        name: 'Tier2',
        requirement: 2500,
        length: '3 hours before Allocation Round opens',
        whitelist: 'Like, Comment & Retweet',
        allocation: 'Yes',
        pool_weight: '30'
    }, {
        name: 'Tier3',
        requirement: 5000,
        length: '3 hours before Allocation Round opens',
        whitelist: 'None',
        allocation: 'Yes',
        pool_weight: '65'
    }, {
        name: 'Tier4',
        requirement: 10000,
        length: '3 hours before Allocation Round opens',
        whitelist: 'None',
        allocation: 'Yes',
        pool_weight: '145'
    }, {
        name: 'Tier5',
        requirement: 25000,
        length: '3 hours before Allocation Round opens',
        whitelist: 'None',
        allocation: 'Yes',
        pool_weight: '400'
    }, {
        name: 'Tier6',
        requirement: 75000,
        length: '3 hours before Allocation Round opens',
        whitelist: 'None',
        allocation: 'Yes',
        pool_weight: '500+ Private allocations'
    }
];

const advisors = [
    {
        picture: member_0,
        name: 'Jasper Byun',
        position: 'Founder',
        company: 'Blocksync Ventures'
    }, {
        picture: member_1,
        name: 'Lester Lim',
        position: 'Founder',
        company: 'X21 Digital'
    }, {
        picture: member_2,
        name: 'Ian Friend',
        position: 'Co-Founder and COO',
        company: 'Ferrum Network'
    }, {
        picture: member_3,
        name: 'Danish Chaudhry',
        position: 'CEO',
        company: 'Bitcoin.com Exchange – Entrepreneur, Startup Advisor, Mentor and Investor'
    }, {
        picture: member_0,
        name: 'EXNETWORK CAPITAL',
        position: '',
        company: 'Exnetwork Capital is an investment firm focused on funding and incubating blockchain projects.'
    }, {
        picture: member_1,
        name: 'Tim Frost',
        position: 'CEO and co-founder',
        company: 'IELD App'
    }, {
        picture: member_2,
        name: 'INNOVION',
        position: '',
        company: 'Innovion has built a prestigious reputation with a unique approach to guerilla marketing, collaborating with over 200 blockchain projects.'
    },
];

const stakings = [
    {
        name: 'Number of Stakers',
        value: '5133'
    }, {
        name: 'Total CasperPad Stacked',
        value: '31957734.60'
    }, {
        name: 'APY',
        value: '0.00'
    }, {
        name: 'Stacked',
        value: '0.0000'
    }, {
        name: 'Unstacked',
        value: '0.0000'
    }, {
        name: 'Rewards',
        value: '0.0000'
    }, {
        name: 'Connected with MetaMask',
        value: 'If not connected, click the "Connect Wallet" button in the top right corner'
    }, {
        name: 'CasperPad available to deposit',
        value: 'Current Balance: 0.0000'
    }, {
        name: 'BNB available in wallet',
        value: 'BNB is required to pay transaction fees on the Binance Smart Chain network. BNB Balance: 0.0000'
    }, {
        name: 'Eligible to stake',
        value: 'You cannot stake if you have an active CasperPad unstake/withdrawal request'
    }
];

const cards = [
    {
        name: 'Greenpeace',
        picture: card_0,
        env: 0,
        progress: 50,
        stake: true,
        type: 'project',
    }, {
        name: 'OceanCleanup',
        picture: card_1,
        env: 6513,
        progress: 90,
        stake: false,
        type: 'project',
    }, {
        name: 'OceanCleanup',
        picture: card_1,
        env: 6513,
        progress: 90,
        stake: false,
        type: 'organisation',
    }, {
        name: 'Greenpeace',
        picture: card_0,
        env: 0,
        progress: 50,
        stake: true,
        type: 'organisation',
    }, {
        name: 'Greenpeace',
        picture: card_0,
        env: 0,
        progress: 50,
        stake: true,
        type: 'project',
    }, {
        name: 'OceanCleanup',
        picture: card_1,
        env: 6513,
        progress: 90,
        stake: false,
        type: 'project',
    }, {
        name: 'OceanCleanup',
        picture: card_1,
        env: 6513,
        progress: 90,
        stake: false,
        type: 'organisation',
    }, {
        name: 'Greenpeace',
        picture: card_0,
        env: 0,
        progress: 50,
        stake: true,
        type: 'organisation',
    }
]

export { projects, rounds, advisors, stakings, cards };
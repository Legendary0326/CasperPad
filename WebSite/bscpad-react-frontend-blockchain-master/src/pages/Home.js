import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Background from '../components/Background';
import Hero from '../components/Home/Hero';
import AboutUs from '../components/Home/AboutUs';
import Tiers from '../components/Home/Tiers';
import Tokenomics from '../components/Home/Tokenomics';
import System from '../components/Home/System';
import Advisors from '../components/Home/Advisors';
import Contact from '../components/Home/Contact';
import Particles from 'react-particles-js';

export default function Home() {

    return (
        <>
            <Header />
            <Background />
            <Hero />
            <AboutUs />
            <Tiers />
            <Tokenomics />
            <System />
            {/* <Advisors /> */}
            <Contact />
            <Footer />
        </>
    )
}
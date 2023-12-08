import React from 'react';
import Navbar from '../components/navbar';
import styles from '../src/styles/Welcome.module.css';

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h1 className={styles.title} style={{marginTop:'30px'}}>About Us</h1>
                <div className="aboutUs" style={{ textAlign: 'center', marginTop:'100px' }}>
                    <p>MovieHut.pt - a Film Search Engine powered by Movie Scripts and other Movie Metadata.</p>
                    <p>We are a group of 4 students developing this project for the course <a target='_blank' href="https://sigarra.up.pt/feup/en/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=518807" className='link'>PRI</a>.</p>
                    <br/><p>Our team consists of:</p>
                    <ul>
                        <li><a target='_blank' href="https://github.com/Antoni0Ferreira" className='link'>António Ferreira</a></li>
                        <li><a target='_blank' href="https://github.com/kiko-serra" className='link'>Francisco Serra</a></li>
                        <li><a target='_blank' href="https://github.com/FranciscoMaldonado0" className='link'>João Maldonado</a></li>
                        <li><a target='_blank' href="https://github.com/tommygomez25" className='link'>Tomás Gomes</a></li>
                    </ul>
                    <br/>
                    <p>Our goal is to create a search engine that allows users to search for movies based on their scripts and other metadata.</p>
                    <p>Check out our code at <a target='_blank' href="https://github.com/Antoni0Ferreira/FEUP-PRI" className='link'>Github</a>.</p>
                </div>
            </div>
        </>
    );
};

export default AboutUs;

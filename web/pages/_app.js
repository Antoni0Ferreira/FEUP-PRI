import '../src/styles/Welcome.module.css'
import '../src/styles/footer.css'
import '../src/styles/globals.css'
import '../src/styles/aboutUs.css'

import AppLayout from "../src/layout/AppLayout";
import Footer from '../components/footer.js';

function MyApp({ Component, pageProps }) {
    return (
        <AppLayout>
            <>
                <Component {...pageProps} />
                {Component && <Footer />}
            </>
        </AppLayout>
    );
}

export default MyApp;

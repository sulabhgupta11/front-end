import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import './../styles/globals.scss';

import { userService } from './../services/user.service';
import { Alert } from '../components/Alert';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        authCheck(router.asPath);
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/user/login', '/user/register'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/user/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Crack Deal</title>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css"></link>
                <link rel="stylesheet" href="https://www.markuptag.com/bootstrap/5/css/bootstrap.min.css"></link>
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Alert />
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>
        </>
    );
}
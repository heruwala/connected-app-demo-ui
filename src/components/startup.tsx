import React, { useEffect, useState } from 'react';
import '@salesforce/canvas-js-sdk';
import { useAuth } from 'react-oidc-context';

export const Startup: React.FC<any> = (_props) => {
    const auth = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    const checkLogin = () => {
        const canvas = global.Sfdc.canvas;
        if (canvas.oauth.loggedin()) {
            setLoggedIn(true);
            console.log('Logged in');
            console.log('Token: ', canvas.oauth.token());
        } else {
            setLoggedIn(false);
            console.log('Not logged in');
            const uri = canvas.oauth.loginUrl();
            console.log('Login URL: ', uri);
            canvas.oauth.login({
                uri: uri,
                params: {
                    response_type: 'token',
                    client_id: '3MVG9KsVczVNcM8xBfX.rFLJ80L9R.HCQKsXBioYk6kbaZ4Hm3y8bwCNz7v_vNSOSoUwPXq_OfELfJVoIJAj_',
                    display: 'page',
                    immidiate: true,
                    redirect_uri: encodeURIComponent('https://ui.dhaval.ml/oauth2/callback'),
                } as any,
            });
            const result = canvas.oauth.loggedin();
            console.log('Logged in 2: ', result);
            const token = canvas.oauth.token();
            console.log('token in 2: ', token);
        }
    };

    useEffect(() => {
        console.log('here 1');
        console.log('hash: ', window.location.hash);
        const hash = parseHash(window.location.hash);

        // store target_origin and instance_id in local storage from hash
        if (hash.target_origin) {
            localStorage.setItem('target_origin', hash.target_origin);
        }
        if (hash.instance_id) {
            localStorage.setItem('instance_id', hash.instance_id);
        }

        //window.Sfdc.canvas(function() {
        console.log('here 2');
        //checkLogin();
        auth.signinRedirect();
        console.log('here 3');
        //});
    }, []);

    const parseHash = (hashString: string) => {
        const hash = hashString.substring(1);
        const params = hash.split('&');
        const hashParams: any = {};
        for (let i = 0; i < params.length; i++) {
            const p = params[i].split('=');
            hashParams[p[0]] = decodeURIComponent(p[1]);
        }
        return hashParams;
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Welcome to Salesforce Connected App. {loggedIn ? 'Logged in' : 'Not logged in'}</p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
};

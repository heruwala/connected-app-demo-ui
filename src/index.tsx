import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import { ApolloConnection } from './components/apollo-connection';

const oidcConfig = {
    authority: 'https://awesome-dhaval-dev-ed.my.salesforce.com',
    client_id: '3MVG9KsVczVNcM8xBfX.rFLJ80L9R.HCQKsXBioYk6kbaZ4Hm3y8bwCNz7v_vNSOSoUwPXq_OfELfJVoIJAj_',
    redirect_uri: 'https://ui.dhaval.ml/oauth2/callback',
    code_verifier: true,
    noonce: true,
    responseType: 'code',
    scope: 'openid id profile email',  
    onSigninCallback: (_user: any | void): void => {
        console.log('signed in');
        window.history.replaceState({}, document.title, window.location.pathname);
    },
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider {...oidcConfig}>
                <ApolloConnection>
                    <App/>
                </ApolloConnection>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

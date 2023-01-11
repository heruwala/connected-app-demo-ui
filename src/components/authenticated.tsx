import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import '@salesforce/canvas-js-sdk';
import { Data } from './data';

export const Authenticated: React.FC<any> = (_props) => {
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

    switch (auth.activeNavigator) {
        case 'signinSilent':
            return <div>Signing you in...</div>;

        case 'signoutRedirect':
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        const canvas = global.Sfdc.canvas;
        canvas.oauth.token(auth.user?.access_token);
        console.log('Token: ', canvas.oauth.token());

        const client = {
            oauthToken: auth.user?.access_token,
            instanceId: localStorage.getItem('instance_id'),
            targetOrigin: localStorage.getItem('target_origin'),
        }

        //var ctxlink = Sfdc.canvas.byId("ctxlink");

            canvas.client.ctx((msg: any) => {
                console.log('Message: ', JSON.stringify(msg));
                console.log('UserId: ', msg.payload.user.userId);
                console.log('Size: ', JSON.stringify(canvas.client.size()));
                //canvas.client.autogrow(client);
                canvas.client.resize(client, { height: '1000', width: '500' });
                console.log('Size: ', JSON.stringify(canvas.client.size()));
            }, client);
        
        if (auth.user?.profile) {
            console.log('User: ', JSON.stringify(auth.user));
        }
        return (
            <div>
                Hello
                {auth.user?.profile ? (
                    <div>
                        <div>Sub(unique userId): {auth.user.profile.sub}</div>
                        <div>Email: {auth.user.profile.email}</div>
                        <div>Phone Number: {auth.user.profile.phone_number}</div>
                        <div>Profile: {auth.user.profile.profile}</div>

                        <div>Email Verified: {auth.user.profile.email_verified ? 'Yes' : 'No'}</div>

                        <div>Name: {auth.user.profile.name}</div>

                        <div>
                            Picture: <img src={auth.user.profile.picture} alt="profile" />
                        </div>

                        <div>Preferred Username: {auth.user.profile.preferred_username}</div>

                        <div>Nickname: {auth.user.profile.nickname}</div>

                        <div>Given Name: {auth.user.profile.given_name}</div>

                        <div>Family Name: {auth.user.profile.family_name}</div>

                        <div>Locale: {auth.user.profile.locale}</div>

                        <div>Updated At: {auth.user.profile.updated_at}</div>

                    </div>
                ) : (
                    <div>Nothing</div>
                )}
                <Data/>
                <button onClick={() => void auth.removeUser()}>Log out</button>
            </div>
        );
    }
    return <div>Hello World </div>;
};

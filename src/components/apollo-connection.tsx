import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, from, HttpLink } from '@apollo/client';

export const ApolloConnection: React.FC<any> = (props) => {

    const oidcDetails = JSON.parse(sessionStorage.getItem('oidc.user:https://awesome-dhaval-dev-ed.my.salesforce.com:3MVG9KsVczVNcM8xBfX.rFLJ80L9R.HCQKsXBioYk6kbaZ4Hm3y8bwCNz7v_vNSOSoUwPXq_OfELfJVoIJAj_') || '{}');

    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'https://dataaccess.dhaval.ml/graphql',
            headers: {
                Authorization: `Bearer ${oidcDetails.id_token}`,
            },
        }),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, from, HttpLink } from '@apollo/client';

export const ApolloConnection: React.FC<any> = (props) => {

    const oidcDetails = JSON.parse(sessionStorage.getItem('oidc.user:https://d0b000000venlea2-dev-ed.my.salesforce.com:3MVG9dZJodJWITSsjcwSiY9YTUlvnIdQdljU4fSCfwNgmZLdzMZjzPBhrI3Cc16DRfQyhjlYbtFbl6h9CNlp4') || '{}');

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

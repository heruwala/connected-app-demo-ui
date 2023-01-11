import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_MESSAGE = gql`
    query {
        message
    }
`;

export const Data: React.FC = () => {
    // Display the query "message" from graphql server
    const { loading, error, data } = useQuery(GET_MESSAGE);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <p>{data.message}</p>;
};
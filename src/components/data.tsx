import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_MESSAGE = gql`
    query GetMessage($contactId: String!) {
        message(contactId: $contactId)
    }
`;

export const Data: React.FC = () => {
    const contactId = sessionStorage.getItem('contactId');

    // Display the query "message" from graphql server
    const { loading, error, data } = useQuery(GET_MESSAGE, {
        variables: { contactId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <p>{data.message}</p>;
};
import { gql } from "@apollo/client";

export const multipleQuery = (query: string[]) => {
    let nestedQuery: string = '';
    for (const q of query) {
        nestedQuery = nestedQuery + q;
    }
    return gql`
        query Multiple_Query{
            ${nestedQuery}        
        }
    `;
} 
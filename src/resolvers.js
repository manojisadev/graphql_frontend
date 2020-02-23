import gql from "graphql-tag";
import { Resolvers } from 'apollo-client'


export const typeDefs = gql`
    extend type Query {
        isShowCreateTodo: Boolean!
    }

    extend type Mutation {
        setShowCreateTodo(showCreate: Boolean!): Boolean!
    }
`;

export const resolvers = {};
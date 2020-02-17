import gql from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        isShowCreateTodo: Boolean!
    }

    extend type Mutation {
        setShowCreateTodo(showCreate: Boolean!): Boolean!
    }
`;

export const resolvers = {};
const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        pets: [Pet]!
    }

    enum PetType {
        CAT
        DOG
    }

    type Pet {
        id: ID!
        createdAt: String!
        name: String!
        type: PetType!
        img: String
        owner: User!
    }

    input PetInput {
        name: String
        type: String
    }

     input NewPet {
        name: String!
        type: String!
    }

    type Query {
        pets(input: PetInput): [Pet]!
        pet(input: PetInput): Pet
    }

    type Mutation {
        pet(input: NewPet!): Pet!
        removePet(id: String!): String!
    }

`;

module.exports = typeDefs

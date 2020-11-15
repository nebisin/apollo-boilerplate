const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		users(query: String, limit: Int, skip: Int, sort: SortInput): [User!]!
        me: User!
	}

    type Mutation {
		createUser(data: CreateUserInput!): AuthPayload!
		login(email: String!, password: String!): AuthPayload!
		logout: User!
		deleteUser: User!
		updateUser(data: UpdateUserInput!): User!
	}

    type AuthPayload {
		token: String!
		user: User!
	}

	input CreateUserInput {
		name: String!
		email: String!
		password: String!
	}

	input UpdateUserInput {
		name: String
		email: String
		password: String
	}

	input SortInput {
		createdAt: Int
		updatedAt: Int
	}

	type User {
		id: ID!
		name: String!
		email: String
		reviews: [Review!]!
		updatedAt: String!
		createdAt: String!
	}

    type Product {
        id: ID!
        title: String!
        slug: String!
        description: String!
        body: String!
        reviews: [Review!]!
        price: Int!
        stock: Int!
        averageRating: Int!
        ratingCount: Int!
        updatedAt: String!
		createdAt: String!
    }

    type Review {
        id: ID!
        user: User!
        product: Product!
        text: String!
        rating: Int!
    }
`;

module.exports = typeDefs;

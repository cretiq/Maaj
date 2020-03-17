const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type Player {
        _id: ID!
        nickname: String!
        role: String!
        password: String
        points: [Point!]
    }
    
    type Point {
        _id: ID!
        date: String!
    }
    
    input PlayerInput {
        nickname: String!
        role: String!
        password: String!
    }
    
    type RootQuery {
        players: [Player!]!
        points: [Point!]!
    }

    type RootMutation {
        createPlayer(playerInput: PlayerInput): Player
        givePoint(nickname: String, date: String): Player
        deletePoint(pointId: ID!, nickname: String): Player
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`
);

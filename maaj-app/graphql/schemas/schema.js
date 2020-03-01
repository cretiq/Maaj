const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type Player {
        _id: ID!
        nickname: String!
        role: String!
        password: String
        points: [String!]
    }
    
    input PlayerInput {
        nickname: String!
        role: String!
        password: String!
    }
    
    type RootQuery {
        players: [Player!]!
    }

    type RootMutation {
        createPlayer(playerInput: PlayerInput): Player
        givePoint(nickname: String, date: String): Player
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

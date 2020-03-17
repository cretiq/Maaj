const {transformPlayer} = require("./merge");
const Point = require('../../models/point');
const Player = require('../../models/player');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    players: async () => {
        try {
            const players = await Player.find();
            return players.map(player => {
                return transformPlayer(player)
            })
        } catch (err) {
            throw err;
        }
    },

    points: async () => {
        try {
            const points = await Point.find();
            return points.map(point => {
                return {
                    ...point._doc,
                    _id: point.id
                }
            })
        } catch (err) {
            throw err;
        }
    },


    createPlayer: async args => {
        try {
            const existingPlayer = await Player.findOne({nickname: args.playerInput.nickname});
            if (existingPlayer) {
                throw new Error('Nickname already exists');
            }
            const pwHash = await bcrypt.hash(args.playerInput.password, 12);
            const player = new Player({
                nickname: args.playerInput.nickname,
                role: args.playerInput.role,
                password: pwHash
            });
            return player
                .save()
                .then(result => {
                    return {...result._doc};
                })
                .catch(err => {
                    console.log(err);
                    throw(err);
                });
        } catch (err) {
            throw err;
        }
    },

    givePoint: async args => {
        const point = new Point({
            date: args.date
        });
        let transformedPlayer;
        try {
            const result = await point.save();
            const player = await Player.findOne({nickname: args.nickname});
            if (!player) { throw new Error('User not found.'); }

            transformedPlayer = transformPlayer(player);

            player.points.push(result);
            await player.save();
            return transformedPlayer;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    deletePoint: async args => {
        let transformedPlayer;
        try {
            console.log(args.pointId);
            const player = await Player.findOne({nickname: args.nickname});
            transformedPlayer = transformPlayer(player);
            const point = await Point.findById(args.pointId).populate('points');
            await point.deleteOne({_id: args.pointId});

            return transformedPlayer;

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    login: async ({email, password}) => {

        const player = await Player.findOne({email: email});
        if (!player)
            throw new Error('Player does not exist');

        const passCheck = await bcrypt.compare(password, player.password);
        if (!passCheck)
            throw new Error('Wrong password!');

        const token = jwt.sign(
            {playerId: player.id, email: player.email},
            'secretkey',
            {expiresIn: '3h'}
        );
        return {playerId: player.id, token: token, tokenExpiration: 3};
    }
};


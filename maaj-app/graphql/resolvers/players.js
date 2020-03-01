const Player = require('../../models/player');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    players: async () => {
        try {
            const player = await Player.find();
            return player.map(player => {
                return {
                    ...player._doc,
                    _id: player.id
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
        const point = args.date;
        try {
            const player = await Player.findOne({nickname: args.nickname});
            if (!player) { throw new Error('User not found.'); }
            player.points.push(point);
            await player.save();
            return player;
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


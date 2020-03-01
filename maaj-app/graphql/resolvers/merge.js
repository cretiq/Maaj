const Player = require('../../models/player');

const points = async statusUpdateIds => {
    try {
        const statusUpdates = await StatusUpdate.find({ _id: { $in: statusUpdateIds } });
        return statusUpdates.map(statusUpdate => {
            return transformStatusUpdate(statusUpdate);
        });
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const player = await Player.findById(userId);
        return {
            ...player._doc,
            _id: player.id,
            points: statusUpdates.bind(this, player._doc.points)
        };
    } catch (err) {
        throw err;
    }
};

const transformPoint = points => {
    return {
        ...points._doc,
        _id: points.id,
        date: new Date(points._doc.date).toISOString(),
        creator: user.bind(this, points.creator)
    };
};

exports.transformStatusUpdate = transformStatusUpdate;

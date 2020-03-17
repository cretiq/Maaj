const Player = require('../../models/player');
const Point = require('../../models/point');

const points = async point => {
    try {
        const points = await point.find({ _id: { $in: pointIds } });
        return points.map(point => {
            return transformPoint(point);
        });
    } catch (err) {
        throw err;
    }
};

const getPoint = async pointId => {
    try {
        const points = await Point.find({ _id: { $in: pointId }});
        return points.map(point => {
            return {
                ...point._doc,
                _id: point.id,
                date: new Date(point._doc.date).toISOString(),
            }
        });
    } catch (err) {
        throw err;
    }
};

const transformPlayer = player => {
    return {
        ...player._doc,
        _id: player.id,
        points: getPoint.bind(this, player.points)
    };
};

exports.transformPlayer = transformPlayer;

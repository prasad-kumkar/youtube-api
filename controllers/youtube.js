const Video = require('../models/Video');

exports.getVideos = async (req, res) => {
    Video.paginate({ title: { $regex: new RegExp(req.query.query), $options: "i" } }, {
        limit: req.query.limit, 
        page: req.query.page
    })
    .then(videos => {
        res.send(videos)
    })
    .catch(err => {
        res.status(400).send(err)
    })
}
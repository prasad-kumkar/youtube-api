const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const videoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    publishTime: {
        type: String,
        required: true
    },

    thumbnailUrls: {
        type: Object,
        required: true
    }

}, {timestamps: true});

videoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Video', videoSchema);

const express = require('express')
const videoRouter = express.Router()
const {
    createVideo,
    getAllVideos,
    getSingleVideo,
    deleteVideo,
    patchVideo,
} = require('../controler/video')

videoRouter
    .get('/', getAllVideos)
    .get('/:id', getSingleVideo)
    .delete('/:id', deleteVideo)
    .patch('/:id', patchVideo)
    .post('/', createVideo)

module.exports = videoRouter
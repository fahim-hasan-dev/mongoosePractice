const { Video } = require('../model/video');

// Get all Videos
const getAllVideos = async (req, res) => {
    let query = {};
    const page = parseInt(req.query.page)
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const sort = {};
    // filter by video title
    if (req.query.title) {
        query.title = { $regex: new RegExp(req.query.title, 'i') }
    }
    // filter by video category
    if (req.query.category) {
        query.category = { $regex: new RegExp(req.query.category, 'i') }
    }
    // filter by video language
    if (req.query.language) {
        query.language = { $regex: new RegExp(req.query.language, 'i') }
    }
    // filter recommended videos
    if (req.query.recommended) {
        if (req.query.recommended === 'true') {
            query.recommended = true
        } else if (req.query.recommended === 'false') {
            req.query.recommended === 'false'
        }
    }
    // filter featured videos
    if (req.query.featured) {
        if (req.query.featured === 'true') {
            query.featured = true
        } else if (req.query.featured === 'false') {
            query.featured = false
        }

    }
    // filter videos by hero name
    if (req.query.hero) {
        query.hero = { $regex: new RegExp(req.query.hero, 'i') }
    }
    // filter videos by tags name
    if (req.query.tags) {
        query.tags = { $regex: new RegExp(req.query.tags, 'i') }
    }
    // sort video assanding or dissanding
    if (req.query.sortBy) {
        sort[req.query.sortBy] = req.query.sort ? parseInt(req.query.sort) : 1
    }

    try{
        const result = await Video.find(query).sort(sort).skip(page * limit).limit(limit)
        res.status(201).send(result)
    } catch (err){
        res.status(400).send(err.message)
    }
    
}

// Get single video by id
const getSingleVideo = async (req, res) => {
    // const query = { _id: new ObjectId(req.params.id) }
    // // check user admin or normal user
    // if (req.query.admin === 'true') {
    //     const exVideoData = await Video.findOne(query)
    //     res.send(exVideoData)
    // } else {
    //     // if user is a normal user incriment the videos views
    //     const exVideoData = await Video.findOne(query)
    //     const updateVideo = {
    //         $set: {
    //             view: exVideoData.view ? exVideoData.view + 1 : 1
    //         }
    //     }
    //     const updateView = await Video.updateOne(query, updateVideo)
    //     const updateVideoData = await Video.findOne(query)
    //     res.send(updateVideoData)
    // }

    try{
        const doc = await Video.findById(req.params.id)
        res.status(201).send(doc)
    } catch (err){
        res.status(400).send(err.message)
    }

}


// Upload Video
const createVideo = async (req, res) => {
    const video = new Video(req.body)
    try{
        const doc = await video.save()
        res.status(201).send(doc)
    } catch (err){
        res.status(400).send(err.message)
    }
  
// if(req.query.notifyingUser==='true'){
//     const notification = {
//         title:video.title,
//         notificationFor:'premium',
//         category:'video',
//         contentThambnail:video.thambnail,
//         date:new Date(),
//         contentId:result.insertedId,
//     }
//     notificationCollection.insertOne(notification)
// }

}

// // update video by put operation
// const updateVideo = async (req, res) => {
//     const id = req.params.id;
//     const data = req.body;
//     const filter = { _id: new ObjectId(id) }
//     const options = { upsert: true };
//     const updateVideo = {
//         $set: {
//             title: data.title,
//             url: data.url,
//             category: data.category,
//             thambnail: data.thambnail,
//             description: data.description,
//             rating: data.rating,
//             language: data.language,
//             hero: data.hero,
//             date: data.date,
//             tags: data.tags,
//             featured: data.featured,
//             recommended: data.recommended,
//             view: data.view
//         },
//     }
//     const result = await videoCollection.updateOne(filter, updateVideo, options)
//     res.send(result)
// }


// patch video data for update recommended and featured
const patchVideo = async (req, res) => {
    const data = req.body
    try{
        const doc = await Video.findByIdAndUpdate(req.params.id,{ $set: data },{ new: true })
        res.status(201).send(doc)
    } catch (err){
        res.status(400).send(err.message)
    }
}

// Delete Video
const deleteVideo = async (req, res) => {
    try{
        const doc = await Video.findByIdAndDelete(req.params.id)
        res.status(201).send(doc)
    } catch (err){
        res.status(400).send(err.message)
    }
}



module.exports = {
    createVideo,
    getAllVideos,
    deleteVideo,
    patchVideo,
    getSingleVideo
}
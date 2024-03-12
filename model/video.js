const mongoose = require("mongoose")
const {Schema} = mongoose;

const videoSchema = new Schema ({
    title : {type:String, required: true, unique:true},
    url : {type:String, required: true},
    category: {type:String, required: true},
    tags: {type:[String], required: true},
    thambnail: {type:String, required: true},
    description: {type:String, required: true},
    language: {type:String, required: true},
    hero: {type:String, required: true},
    date: { type: Date, default: Date.now },
    featured: { type: Boolean, default:false },
    recommended: { type: Boolean, default:false },
    rating: {type:Number, min:[1,'rong minemum rating'], max:[10,'rong maximum rating'], default:1},
    view: {type:Number, default:0},
    like: {type:Number, default:0},
    disLike: {type:Number, default:0},
})

const virtual = videoSchema.virtual('id');
virtual.get(()=>{
    return this._id
})
videoSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: (doc,ret)=>{delete ret._id}
})
exports.Video = mongoose.model('Video',videoSchema)
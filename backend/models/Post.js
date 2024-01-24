const mongoose = require('mongoose')
const postSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    topic: {
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    published: {
        type: Boolean,
        default: false,
    },
    coverImage:{
        type:Array,
        default:[],
    },
    likes:{
        type:Map,
        of:Boolean,
        default:{},
    },
    comments:{
        type:Array,
        default:[],
    },

},{timestamps:true})
const Post=mongoose.model('Post',postSchema)
module.exports=Post
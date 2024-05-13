import Post from '../models/Post.js'
import User from '../models/user.js'

//create

export const createPost = async (req, res) => {
    try{
        const {userId, describtion, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            describtion,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []

        });
        await newPost.save();
        // this is for all posts
        const posts = await Post.find();
        res.status(201).json(posts);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
}

//read
export const getFeedPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.status(200).json(posts);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

//update
export const likePost = async (req, res) => {
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId );

        if(isLiked){
            post.likes.delete(userId);
        }
        else{
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );
        // await post.save();
        res.status(200).json(updatedPost); 
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}
 
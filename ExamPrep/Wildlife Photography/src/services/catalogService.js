const Post = require('../models/Post');

exports.getAll = () => Post.find();

exports.getOne = (postId) => Post.findById(postId);

exports.create = (post) => Post.create(post);

exports.getOneDetailed = (postId) => Post.findById(postId).populate('author').populate('votes');

exports.upVote = async (postId, userId) => {
    const post = await Post.findById(postId);

    if (post.votes.some(u => u == userId)) {
        return true;
    }
    post.votes.push(userId);
    post.rating += 1;

    await post.save();

    return false;
}

exports.downVote = async (postId, userId) => {
    const post = await Post.findById(postId);

    if (post.votes.some(u => u == userId)) {
        return true;
    }
    post.votes.push(userId);
    post.rating -= 1;

    await post.save();

    return false;
}

exports.edit = (postId, post) => Post.findByIdAndUpdate(postId, post);

exports.deletePost = (postId) => Post.findByIdAndDelete(postId);
const router = require('express').Router();
const catalogService = require('../services/catalogService');
const userService = require('../services/userService');
const { validatePost } = require('../utils/validations');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { isOwner, isNotOwner } = require('../middlewares/routGuards');

router.get('/allPosts', async (req, res) => {
    const posts = await catalogService.getAll().lean();

    res.render('catalog/all-posts', { posts });
});

router.get('/create', isLoggedIn, (req, res) => {
    res.render('catalog/create');
});

router.post('/create', isLoggedIn, async (req, res) => {
    const post = req.body;

    try {
        validatePost(post);
        post.author = req.user._id;
        const createdPost = await catalogService.create(post);

        userService.addToMyPosts(req.user._id, createdPost._id);

        res.redirect('/catalog/allPosts');

    } catch (error) {
        res.render('catalog/create', { post, error });
    }
});

router.get('/:postId/details', async (req, res) => {
    const post = await catalogService.getOneDetailed(req.params.postId).lean();
    const authorFullName = `${post.author.firstName} ${post.author.lastName}`;
    const isAuthor = post.author._id == req.user?._id;
    const isVoted = post.votes.some(v => v._id == req.user?._id);
    const voters = post.votes.map(v => v.email).join(', ');

    res.render('catalog/details', { post, authorFullName, isAuthor, isVoted, voters });
});

router.get('/:postId/upVote', isLoggedIn, isNotOwner, async (req, res) => {
    const isVoted = await catalogService.upVote(req.params.postId, req.user._id);

    if (isVoted) {
        return res.redirect('/404');
    }
    res.redirect(`/catalog/${req.params.postId}/details`);
});

router.get('/:postId/downVote', isLoggedIn, isNotOwner, async (req, res) => {
    const isVoted = await catalogService.downVote(req.params.postId, req.user._id);

    if (isVoted) {
        return res.redirect('/404');
    }
    res.redirect(`/catalog/${req.params.postId}/details`);
});

router.get('/:postId/edit', isLoggedIn, isOwner, async (req, res) => {
    const post = await catalogService.getOne(req.params.postId).lean();

    res.render('catalog/edit', { post });
});

router.post('/:postId/edit', isLoggedIn, isOwner, async (req, res) => {
    const post = req.body;

    try {
        validatePost(post);

        await catalogService.edit(req.params.postId, post);

        res.redirect(`/catalog/${req.params.postId}/details`);

    } catch (error) {
        res.render('catalog/edit', { post, error });
    }
});

router.get('/:postId/delete', isLoggedIn, isOwner, async (req, res) => {
    await catalogService.deletePost(req.params.postId);

    res.redirect('/catalog/allPosts');
});

module.exports = router;
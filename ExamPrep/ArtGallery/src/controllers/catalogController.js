const router = require('express').Router();
const catalogService = require('../services/catalogService');
const { validatePublication } = require('../utils/validations');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { isOwner, isNotOwner } = require('../middlewares/routGuards');

router.get('/gallery', async (req, res) => {
    const publications = await catalogService.getAll().lean();

    res.render('catalog/gallery', { publications });
});

router.get('/create', isLoggedIn, (req, res) => {
    res.render('catalog/create');
});

router.post('/create', isLoggedIn, async (req, res) => {
    const publication = req.body;

    try {
        validatePublication(publication);

        publication.author = req.user._id;

        await catalogService.create(publication);

        res.redirect('/catalog/gallery');

    } catch (error) {
        res.render('catalog/create', { publication, error });
    }
});

router.get('/:publicationId/details', async (req, res) => {
    const publicationId = req.params.publicationId;
    const publication = await catalogService.getOneDetailed(publicationId).lean();
    const isAuthor = publication.author._id == req.user?._id;
    const isShared = publication.usersShared.some(u => u._id == req.user?._id);

    res.render('catalog/details', { publication, isAuthor, isShared });
});

router.get('/:publicationId/share', isLoggedIn, isNotOwner, async (req, res) => {
    const publicationId = req.params.publicationId;

    const isShare = await catalogService.share(publicationId, req.user._id);

    if (!isShare) {
        return res.redirect('/404');
    }

    res.redirect('/');
});

router.get('/:publicationId/edit', isLoggedIn, isOwner, async (req, res) => {
    const publication = await catalogService.getOne(req.params.publicationId).lean();

    res.render('catalog/edit', { publication });
});

router.post('/:publicationId/edit', isLoggedIn, isOwner, async (req, res) => {
    const publication = req.body;

    try {
        validatePublication(publication);
        await catalogService.edit(req.params.publicationId, publication);
        res.redirect(`/catalog/${req.params.publicationId}/details`);

    } catch (error) {
        res.render('catalog/edit', { publication, error });
    }
});

router.get('/:publicationId/delete', isLoggedIn, isOwner, async (req, res) => {
    await catalogService.deletePublication(req.params.publicationId, req.user._id);
    res.redirect('/catalog/gallery');
});

module.exports = router;
const catalogService = require('../services/catalogService');

exports.isOwner = async (req, res, next) => {
    const publicationId = req.params.publicationId;
    const publication = await catalogService.getOne(publicationId);

    if (req.user?._id != publication.author) {
        return res.redirect('/404');
    }
    next();
}

exports.isNotOwner = async (req, res, next) => {
    const publicationId = req.params.publicationId;
    const publication = await catalogService.getOne(publicationId);

    if (req.user?._id == publication.author) {
        return res.redirect('/404');
    }
    next();
}
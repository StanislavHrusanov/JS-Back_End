const cats = [];

exports.catsMiddleware = (req, res, next) => {
    req.cats = cats;

    next();
}
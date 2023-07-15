const Publication = require('../models/Publication');
const User = require('../models/User');

exports.getAll = () => Publication.find();

exports.getOne = (publicationId) => Publication.findById(publicationId);

exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('author');

exports.create = async (publication) => {
    const created = await Publication.create(publication);

    const author = await User.findById(created.author);
    author.myPublications.push(created._id);
    await author.save();
}

exports.share = async (publicationId, userId) => {
    const publication = await Publication.findById(publicationId);
    const user = await User.findById(userId);

    if (publication.usersShared.some(u => u == userId)) {
        return false;
    }
    publication.usersShared.push(userId);
    user.sharedPublications.push(publicationId);

    await publication.save();
    await user.save();

    return publication;
}

exports.edit = (publicationId, newData) => Publication.findByIdAndUpdate(publicationId, newData);

exports.deletePublication = async (publicationId, userId) => {
    const author = await User.findById(userId);
    const indexOfPublication = author.myPublications.indexOf(publicationId);
    author.myPublications.splice(indexOfPublication, 1);
    await author.save()

    return Publication.findByIdAndDelete(publicationId);
}
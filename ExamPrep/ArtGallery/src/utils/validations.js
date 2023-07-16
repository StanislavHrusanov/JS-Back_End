exports.validateUser = ({ username, password, repass, address }) => {

    if (username.length < 4) {
        throw 'Email must be at least 4 characters!';
    }
    if (password.length < 3) {
        throw 'Password must be at least 3 characters!';
    }
    if (password != repass) {
        throw 'Passwoeds don\'t match!';
    }
    if (!address || address.length > 20) {
        throw 'Address is required and must be maximum 20 characters!';
    }
}

exports.validatePublication = ({ title, paintingTechnique, artPicture, certificate }) => {
    if (title.length < 6) {
        throw 'Title must be at least 6 characters!';
    }
    if (!paintingTechnique || paintingTechnique.length > 15) {
        throw 'Painting technique is requiredand must be maximum 15 characters!';
    }

    if (!artPicture.match(/https*:\/\/.*/g)) {
        throw 'Art picture must be a link!';
    }

    const cerificates = ['Yes', 'No'];

    if (!cerificates.includes(certificate)) {
        throw 'Certificate field is required and must be Yes or No!';
    }
}

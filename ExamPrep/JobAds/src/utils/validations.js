exports.validateUser = ({ email, password, repass, description }) => {
    if (!email.match(/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/g)) {
        throw 'Invalid email!';
    }

    if (password.length < 5) {
        throw 'Password must be at least 5 characters!';
    }
    if (password != repass) {
        throw 'Passwoeds don\'t match!';
    }
    if (description == '') {
        throw 'Description is required!';
    }
    if (description.length > 40) {
        throw 'Description must be max 40 characters!';
    }
}

exports.validateAd = ({ headline, location, companyName, companyDescription }) => {
    if (headline.length < 4) {
        throw 'Headline must be at least 4 characters!';
    }
    if (location.length < 8) {
        throw 'Location must be at least 8 characters!';
    }
    if (companyName.length < 3) {
        throw 'Company name must be at least 3 characters!';
    }
    if (companyDescription == '') {
        throw 'Company description is required!';
    }
    if (companyDescription.length > 40) {
        throw 'Description must be max 40 characters!';
    }
}

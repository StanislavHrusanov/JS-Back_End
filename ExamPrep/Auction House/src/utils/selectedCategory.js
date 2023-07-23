exports.findSelectedCategory = (category) => {
    const selectedCategory = {
        'estate': false,
        'vehicles': false,
        'electronics': false,
        'furniture': false,
        'other': false
    }
    if (category == 'Real Estate') {
        selectedCategory.estate = true;
    } else if (category == 'Vehicles') {
        selectedCategory.vehicles = true;
    } else if (category == 'Electronics') {
        selectedCategory.electronics = true;
    } else if (category == 'Furniture') {
        selectedCategory.furniture = true;
    } else if (category == 'Other') {
        selectedCategory.other = true;
    }
    return selectedCategory;
}
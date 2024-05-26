const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    nearbyHospitals: {
        type: String,
        required: true
    },
    nearbyColleges: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Property', PropertySchema);

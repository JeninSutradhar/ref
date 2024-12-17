const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    referralSource: {
        type: String,
        required: true,
    },
    referredBy: {
        type: String,
    },
    subscribe: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completedOffers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Offer',
        default: []
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
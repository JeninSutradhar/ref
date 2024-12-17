const User = require('../models/User');

// @desc    Save questionnaire submission
// @route   POST /api/users
const createUser = async (req, res) => {
    const { referralSource, referredBy, subscribe } = req.body;
    try {
        const newUser = new User({
            referralSource,
            referredBy,
            subscribe,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update User Offer Completion
// @route   PUT /api/users/:userId
const updateUserOfferCompletion = async (req, res) => {
      const { offerId } = req.body;

      try {
          const user = await User.findById(req.params.userId);
          if(!user){
              return res.status(404).json({ message: 'User not found'});
           }

           //check if offer already completed
           if (user.completedOffers.includes(offerId)) {
               return res.status(400).json({ message: 'Offer already completed'})
            }
            user.completedOffers.push(offerId)
            await user.save()
            res.status(200).json({ message: 'Offer completion updated', user})
      } catch(error) {
           res.status(500).json({message: error.message});
      }
}
module.exports = {
    createUser,
  updateUserOfferCompletion
};
const Offer = require('../models/Offer');

// @desc    Get all active offers
// @route   GET /api/offers
const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ status: 'active' });
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new offer
// @route   POST /api/offers
const addOffer = async (req, res) => {
    const { title, description, status } = req.body;
     if (!title || !description ) {
      return res.status(400).json({ message: "Title and Description required"})
    }
    try {
        const newOffer = new Offer({
            title,
            description,
           status
        });
        const savedOffer = await newOffer.save();
        res.status(201).json(savedOffer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Edit offer
// @route   PUT /api/offers/:id
const editOffer = async (req, res) => {
    try {
         const { title, description, status } = req.body;
         if (!title || !description ) {
              return res.status(400).json({ message: "Title and Description required"})
         }

        const offer = await Offer.findByIdAndUpdate(req.params.id, {
           title, description,status
        }, { new: true });

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete offer
// @route   DELETE /api/offers/:id
const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single offer
// @route   GET /api/offers/:id
const getOfferById = async (req, res) => {
  try {
      const offer = await Offer.findById(req.params.id);
       if(!offer){
        return res.status(404).json({message: 'Offer not Found'});
      }
     res.json(offer)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
    getOffers,
    addOffer,
    editOffer,
    deleteOffer,
    getOfferById
};
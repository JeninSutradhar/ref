const express = require('express');
const router = express.Router();
const { getOffers, addOffer, editOffer, deleteOffer, getOfferById } = require('../controllers/offerController');

router.get('/', getOffers);
router.post('/', addOffer);
router.put('/:id', editOffer);
router.delete('/:id', deleteOffer);
router.get('/:id', getOfferById);

module.exports = router;
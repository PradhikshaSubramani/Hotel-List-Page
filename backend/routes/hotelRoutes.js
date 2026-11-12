const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { uploadMultiple } = require('../middleware/upload');

router.post('/', uploadMultiple, hotelController.createHotel);
router.get('/', hotelController.getHotels);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', uploadMultiple, hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;
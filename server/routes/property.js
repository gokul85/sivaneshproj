const express = require('express');
const Property = require('../models/Property');
const { authMiddleware } = require('../middleware/auth');
const sendEmail = require('../sendemail');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { propertyName, price, place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
  try {
    const property = new Property({ owner: req.user.id, propertyName, price, place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/find/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const properties = await Property.findById(id);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/owner', authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { propertyName, place, price, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
  try {
    let property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    property = await Property.findByIdAndUpdate(id, { propertyName, place, price, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges }, { new: true });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await Property.findByIdAndDelete(id);
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    property.likes += 1;
    await property.save();
    res.json({ likes: property.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/interested', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id).populate('owner', 'email phoneNumber');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const tenantDetails = `${req.user.firstName} ${req.user.lastName}, Email: ${req.user.email}, Phone: ${req.user.phoneNumber}`;
    const ownerDetails = `Email: ${property.owner.email}, Phone: ${property.owner.phoneNumber}`;

    await sendEmail({
      to: req.user.email,
      subject: 'Interested in Property',
      text: `You are interested in the property located at ${property.place}. owner details: ${ownerDetails}`,
    });

    await sendEmail({
      to: property.owner.email,
      subject: 'Property Interest',
      text: `Someone is interested in your property located at ${property.place}. tenant details: ${tenantDetails}`,
    });

    res.json({ owner: property.owner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;

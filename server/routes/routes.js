const router = require('express').Router();
const {Flight,Resevation} =require('../database/model.js')
const bodyParser = require('body-parser');

//*flights

router.get('/', async (req, res) => {
  try {
    const flight = await Flight.find();
    res.status(200).json(flight);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/get/:dest', async (req, res) => {
  try {
    const { dest } = req.params;
    const lowercasedDest = dest.toLowerCase();
    const allDocuments = await Flight.find();
    const filteredDocuments = allDocuments.filter(doc => doc.destination.toLowerCase().includes(lowercasedDest));
    if (filteredDocuments.length > 0) {
      res.status(200).json(filteredDocuments);
    } else {
      res.status(404).json({ message: 'No matching records found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/post', async (req, res) => {
    try {
    const bdd = req.body;
    const existing = await Flight.findOne({ id: bdd.id });
    if (existing) {
      return res.status(400).json({ error: 'User with this ID already exists' });
    }
      const inserted = await Flight.insertMany([bdd]);
      res.status(201).json(inserted);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.put('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {type_flight,capacite,go_date,return_date,destination,price,image} = req.body;
    try {
      const retrive = await Flight.findOne({id:id})
      if (type_flight) retrive.type_flight = type_flight;
      if (capacite) retrive.capacite = capacite;
      if (go_date) retrive.go_date = go_date;
      if (destination) retrive.destination=destination;
      if (return_date) retrive.return_date = return_date;
      if (price) retrive.price = price;
      if (image) retrive.image = image;
      await retrive.save();
      res.status(200).json(retrive);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    }
  );
  router.delete('/delete/:id',async (req, res) => {
    const {id} = req.params;
    try {
      await Flight.deleteOne({id:id})
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  //*reservation

  router.post('/reservation/post', async (req, res) => {
    try {
    const bdd = req.body;
    const existing = await Resevation.findOne({id : bdd.id})
    if (existing) {
      return res.status(400).json({ error: 'reservation with this ID already exists' });
    }
      const inserted = await Resevation.insertMany([bdd]);
      res.status(201).json(inserted);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/reservation/', async (req, res) => {
    try {
      const flight = await Resevation.find();
      res.status(200).json(flight);
    } catch (e) {
      res.status(500).json(e);
    }
  });
  
  router.delete('/reservation/delete/:id',async (req, res) => {
    const {id} = req.params;
    try {
      await Resevation.deleteOne({id:id})
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports= router
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const fs = require("fs");
const auth = require("../middleware/auth");
const config = require('../config');
const Load = require("../models/Load");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

const cpUpload = upload.fields([{name: 'BOL', maxCount: 1}, {name: 'RC', maxCount: 1}])

router.get('/', auth, async (req, res) => {
    try {
        if (req.query.status === 'finished' || req.query.status === 'cancel') {
            const loads = await Load.find({status: {$in: ['finished', 'cancel']}}).populate('driverId', ['name', 'status']).populate('dispatchId', 'displayName');
            res.send(loads);
        } else {
            const loads = await Load.find(req.query).populate('driverId', ['name', 'status']).populate('dispatchId', 'displayName');
            res.send(loads);
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const load = await Load.findById(req.params.id).populate('driverId', 'name').populate('dispatchId', 'displayName');

        res.send(load);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', auth, cpUpload, async (req, res) => {
    try {
        const {loadCode, driverId, dispatchId, price, miles, rpm, datePU, dateDEL, pu, del, comment, timeToPU, timeToDel} = req.body;
        
        const loadData = {
            loadCode,
            driverId,
            dispatchId,
            price,
            miles,
            rpm,
            datePU: new Date(datePU).toLocaleDateString('en-Us'),
            dateDEL: new Date(dateDEL).toLocaleDateString('en-Us'),
            timeToDel,
            timeToPU,
            pu,
            del,
            BOL: null,
            RC: null,
            comment: comment || null,
        };

        if (new Date(loadData.datePU) > new Date(loadData.dateDEL)) {
            return res.status(400).send({message: 'DEL date cannot be earlier than PU date!'});
        }

        if (req.files.BOL) {
            loadData.BOL = 'public/uploads/' + req.files['BOL'][0].filename;
        }
        if (req.files.RC) {
            loadData.RC = 'public/uploads/' + req.files['RC'][0].filename;
        }

        const load = new Load(loadData);
        await load.save();

        res.send(load);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/:id', auth, cpUpload, async (req, res) => {
    try {
        const roles = ['admin'];
        const load = await Load.findOne({_id: req.params.id});

        if (!load) {
            return res.status(404).send({message: 'Load not found!'});
        }
        
        if (load.status === 'finished' || load.status === 'cancel') {
            if (!roles.includes(req.user.role)) {
                return res.status(403).send({message: 'You do not have permission to edit!'});
            }
        }

        const {loadCode, driverId, dispatchId, price, miles, rpm, datePU, dateDEL, pu, del, status, comment, timeToPU, timeToDel} = req.body;
        const loadData = {
            loadCode,
            driverId,
            dispatchId,
            price,
            miles,
            rpm,
            datePU: new Date(datePU).toLocaleDateString('en-Us'),
            dateDEL: new Date(dateDEL).toLocaleDateString('en-Us'),
            timeToPU,
            timeToDel,
            pu,
            del,
            status,
            comment: comment || '',
        };
        
        if (new Date(loadData.datePU) > new Date(loadData.dateDEL)) {
            return res.status(400).send({message: 'DEL date cannot be earlier than PU date!'});
        }

        if (req.files.BOL) {
            if (load.BOL) {
                fs.unlinkSync(load.BOL)
            }
            loadData.BOL = 'public/uploads/' + req.files['BOL'][0].filename;
        }
        if (req.files.RC) {
            if (load.RC) {
                fs.unlinkSync(load.RC)
            }
            loadData.RC = 'public/uploads/' + req.files['RC'][0].filename;
        }

        const updateLoad = await Load.findByIdAndUpdate(req.params.id, loadData, {new: true, runValidators: true});

        res.send(updateLoad);

    } catch (e) {
        res.status(400).send(e);
    }
});


router.put('/status/:id', auth, async (req, res) => {
    try {
        const load = await Load.findOne({_id: req.params.id});

        if (!load) {
            return res.status(404).send({message: 'Load not found!'});
        }

        if (load.status === 'upcoming') {
            await Load.findByIdAndUpdate(req.params.id, {status: 'transit'});
            const loads = await Load.find({status: 'upcoming'}).populate('driverId', 'name').populate('dispatchId', 'displayName');

            res.send(loads);
        }

        if (load.status === 'transit') {
            await Load.findByIdAndUpdate(req.params.id, {status: 'finished'});
            const loads = await Load.find({status: 'transit'}).populate('driverId', 'name').populate('dispatchId', 'displayName');

            res.send(loads);

        }


    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/cancel/:id', auth, async (req, res) => {
    try {
        const load = await Load.findOne({_id: req.params.id});

        if (!load) {
            return res.status(404).send({message: 'Load not found!'});
        }

        const canceledLoad = await Load.findByIdAndUpdate(req.params.id, {status: 'cancel'});

        res.send(canceledLoad);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/comment/:id', auth, async (req, res) => {
    try {
        const load = await Load.findOne({_id: req.params.id});

        if (!load) {
            return res.status(404).send({message: 'Load not found!'});
        }

        await Load.findByIdAndUpdate(req.params.id, req.body);
        res.send('Comment added successfully');
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put('/attachment/:id', auth, cpUpload, async (req, res) => {
    try {
        const load = await Load.findOne({_id: req.params.id});

        if (!load) {
            return res.status(404).send({message: 'Load not found!'});
        }

        const loadData = {RC: '',  BOL: ''};

        if (req.files.BOL) {
            if (load.BOL) {
                fs.unlinkSync(load.BOL)
            }
            loadData.BOL = 'public/uploads/' + req.files['BOL'][0].filename;
        }
        if (req.files.RC) {
            if (load.RC) {
                fs.unlinkSync(load.RC)
            }
            loadData.RC = 'public/uploads/' + req.files['RC'][0].filename;
        }


       const updatedLoad = await Load.findByIdAndUpdate(req.params.id, loadData);

       res.send(updatedLoad);
    } catch (e) {
        res.status(400).send(e);
    }
});




module.exports = router;
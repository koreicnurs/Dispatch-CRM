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
        const loads = await Load.find().populate('driverId', 'name').populate('dispatchId', 'displayName');

        res.send(loads);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/', auth, cpUpload, async (req, res) => {
    try {
        const {loadCode, driverId, dispatchId, price, miles, rpm, datePU, dateDEL, pu, del, status, comment} = req.body;

        const loadData = {
            loadCode,
            driverId,
            dispatchId,
            price,
            miles,
            rpm,
            datePU: new Date(datePU),
            dateDEL: new Date(dateDEL),
            pu,
            del,
            status,
            BOL: null,
            RC: null,
            comment: comment || null,
        };

        if (loadData.datePU > loadData.dateDEL) {
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
        const load = await Load.findOne({_id: req.params.id});

        if (!load) {
            return res.status(404).send({message: 'Load not found!'});
        }

        const {loadCode, driverId, dispatchId, price, miles, rpm, datePU, dateDEL, pu, del, status, comment} = req.body;

        const loadData = {
            loadCode,
            driverId,
            dispatchId,
            price,
            miles,
            rpm,
            datePU: new Date(datePU),
            dateDEL: new Date(dateDEL),
            pu,
            del,
            status,
            comment: comment || null,
        };

        if (loadData.datePU > loadData.dateDEL) {
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
        res.status(500).send(e);
    }
});

module.exports = router;
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();

const upload = multer({
    limits: {
        fileSize: 500000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Inspect work for images only'));
        }
        return cb(undefined, true);
    }
});

const results = [
    {
        gold: 67,
        iron: 26
    }, {
        silver: 44,
        sand: 22
    }, {
        volcano: 80,
        iron: 26
    }, {
        copper: 48,
        gold: 12
    }, {
        basalt: 33,
        sand: 11
    }, {
        quartz: 17,
        rock: 11
    }
]

router.post('/inspect', upload.single('inspect'),(req, res) => {
    const buffer = sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    console.log(req.body);
    console.log(req.body.lat);
    res.send(results[Math.floor(Math.random() * Math.floor(5))]);
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});


module.exports = router;
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
        metal: 'gold',
        percentage: 26
    }, {
        metal: 'silver',
        percentage: 22
    }, {
        metal: 'sans',
        percentage: 44
    }];

router.post('/inspect', upload.single('inspect'),(req, res) => {
    const buffer = sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    console.log(req.body);
    console.log(req.body.lat);
    // res.send(results[Math.floor(Math.random() * Math.floor(5))]);
    res.send(results);
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});


module.exports = router;
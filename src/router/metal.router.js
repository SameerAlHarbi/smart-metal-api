const express = require('express');
const multer = require('multer');
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

router.post('/inspect', upload.single('inspect'),(req, res) => {
    res.send({
        gold: 46,
        iron: 66
    });
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});


module.exports = router;
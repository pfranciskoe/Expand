const express = require("express");
const router = express.Router();
const passport = require('passport');
const Response = require('../../models/Response');
const validateResponseInput = require('../../validation/response');

router.get("/test", (req, res) => res.json({ msg: "This is the responses route" }));

//show response
router.get("/:id", (req, res) => {
    Response.findById( req.params.id )
        .populate('author')
        .populate('parent')
        .then(response => res.json(response))
        .catch(err => res.status(404).json({ noresponsefound: 'No comment response found' }));    
})

//post response
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // const { errors, isValid } = validateResponseInput(req.body);

        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }
        console.log(req)
        const newResponse = new Response({
            author: req.body.author,
            text: req.body.text,
            parent: req.body.parent,
            // videoUrl: req.body.videoUrl,
        });

        newResponse.save().then(response => res.json(response));
    }
);

//update response
router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateResponseInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Response.findOneAndUpdate({ _id: req.params.id }, req.body, 
            { new: true } )
            .populate('author')
            .populate('parent')
            .exec(function(err, response) {
                res.json(response);
        });
    }   
);

//delete response
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Response.findOneAndDelete({ _id: req.params.id },
            function (err, response) {
                res.json(response);
            });
    }
);

module.exports = router; 
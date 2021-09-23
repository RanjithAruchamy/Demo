const User = require('../models/users');
const multer = require('multer');

// Get users
module.exports.getUser = (req, res) => {
    User.find()
    .then((users) => res.status(200).send(users));
}

// create user
module.exports.createUser = (req, res) =>{
    User.create(
        {
            "name":req.body.name,
            "age": req.body.age
        },(user, err) =>{
            if(err) res.status(500).send(err)
            else    res.status(201).send(user);
        }
    )
}

//update user
module.exports.updateUser = (req, res) => {
    // console.log(req.params.id);

    /* User.updateOne({"id":req.params.id}, {$set:{"age": 25}}, {new:true}, 
    (err, user) => {
        if(err) res.status(500).send(err)
        else res.status(200).send(user);

    }) */
    User.findByIdAndUpdate({"_id":req.params.id}, {$set:req.body}, {new:true}, 
    (err, user) => {
        if(err) res.status(500).send(err)
        else res.status(200).send(user);

    })
    
//Delete User
    module.exports.deleteUser = (req, res) => {
        userModel.findByIdAndDelete({"_id":req.params.id}, 
        (err, user)=>{
            if(err) res.status(500).send(err)
            else res.status(200).send(user);
        })
    }
}

//Upload a file/image to server
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '\public/files');
    },
    filename: (req, file, cb) => {
        // console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype ='gif';
            cb(null, 'image-' + Date.now() + '.' + filetype)
        }
        if (file.mimetype === 'image/png') {
            filetype ='png';
            cb(null, 'image-' + Date.now() + '.' + filetype)
        }
        if (file.mimetype === 'image/jpeg') {
            filetype ='jpeg';
            cb(null, 'image-' + Date.now() + '.' + filetype)
        }
        if (file.mimetype === 'application/pdf') {
            filetype ='pdf';
            cb(null, 'pdf-' + Date.now() + '.' + filetype)
        }
    }
});
module.exports.upload = multer ({storage: storage})

module.exports.uploadFile = function (req, res, next) {
    console.log(req.body)
    if(!req.file) {
        return res.status(500).send({message: 'Upload fail'});
    }
    else{
        req.body.imageUrl = "http://localhost:8000" +"/images/"+req.file.filename;
        let obj= {url:req.body.imageUrl, uploaded:Date.now()}
        User.findOneAndUpdate({email:req.query.mail}, {$set:{'personal.files.addressProof':obj}},{new:true})
        // .then(console.log(req.body.imageUrl))
        /* Upload.create(req.body, (err, file) => {
            if (err){
                console.log(err);
                return next(err);
            }
            res.json(req.body.imageUrl);
            // console.log(req.body.imageUrl)
        }) */
    }
    console.log(req.body)
    res.json(req.body.imageUrl);
}
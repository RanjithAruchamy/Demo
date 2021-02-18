const User = require('../models/users');

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
    // console.log(req.body + req.query.name);


   
    User.findOneAndUpdate({"name":req.query.name}, {$set:{"age": 30}}, {new:true}, 
    (err, user) => {
        if(err) res.status(500).send(err)
        else res.status(200).send(user);

    })
}
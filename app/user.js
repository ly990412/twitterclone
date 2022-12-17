const express = require('express');

const UserModel = require('../database/user.model');
const StatusModel = require('../database/status.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', function(request, response) {
    const user = request.body;
    //response.cookie("name","123");

    const newUser = {username:user.name};
    StatusModel.insertStatus(newUser);
    return UserModel.createUser(user)
        .then(function(userData){
            const cookie = {
                userName: userData.name
             }

             const token = jwt.sign(cookie, "HuntersSECRET", {
                expiresIn: '14d'
            })

            //return response.cookie('name', ownerData.name);
                return response.cookie('jwt_token', token, {httpOnly: true})
             .status(200).send({username: userData.name});
        })
        .catch(function(error){
               console.log(error);
                return response.status(400).send("User can not be created");
         })
        //     const cookie = {
        //         ownerName: ownerData.name
        //     }

        //     const token = jwt.sign(cookie, "HuntersSECRET", {
        //         expiresIn: '14d'
        //     })

        //     return response.cookie('jwt_token', token, {httpOnly: true})
        //         .status(200).send({username: ownerData.name});
        // })
        // .catch(function(error) {
        //     console.log(error)
        //     return response.status(400).send("Error: User cannot be created")
    

})

router.post('/authenticate', function(req, res) {
    const username = req.body.name;
    const password = req.body.password;

    UserModel.getUserByName(username)
        .then((user) => {
            use = user[0];
            const pass = use.password
            if(pass == password) {
                const cookie = {
                    userName: use.name
                }

                const token = jwt.sign(cookie, "HuntersSECRET", {
                    expiresIn: '14d'
                })

                return res.cookie('jwt_token', token, {httpOnly: true})
                    .status(200).send({username:use.name})

            }  else {
                return res.status(400).send("Not valid password");
            }

        })
})
router.get('/:username',function(request,response){
    const user = request.params.username;
    UserModel.getUserByName(user)
    .then(function(userData){
        response.send(userData);
    })

})
router.post('/:username/:description',function(request,response){
    const user = request.params.username;
    const des = request.params.description;
    console.log(des);
    UserModel.updateDescription(user,des);
    UserModel.getUserByName(user)
    .then(function(userData){
        response.send(userData);
    })
})
router.get('/LoggedIn', function(request, response) {
    const jwt_token = request.cookies.jwt_token;
    //response.send(request.cookies);
    
    if(!jwt_token) {
       return response.status('401').send('No token present!')
     }

    return jwt.verify(jwt_token, "HuntersSECRET", function(err, decoded) {
        if (err) {
            return response.status(400).send("Invalid token")
        } else {
            const userName = decoded.userName;
            
            return UserModel.getUserByName(userName)
            .then(function(userResult){
                response.send(userResult);
            });

        }

    })

})

router.post('/logOut', function(request, response) {

    return response.cookie('jwt_token', {}, {
        maxAge: 0,
    }).send('Successfully logged')

})


module.exports = router;
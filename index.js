const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/user');
const login = require('./models/login');
const app = express();
const port = process.env.PORT || 3000;
const mydb = 'mongodb+srv://evorius:123@clusterv-1.bdlq1.mongodb.net/users?retryWrites=true&w=majority';
mongoose.connect(mydb , {useNewUrlParser:true , useUnifiedTopology:true})
.then(result => {app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});})
.catch(err => console.log(err))

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// Losbeat Landing Page
app.get('/' , (req , res) =>{
   res.sendFile('./Views/Losbeats.html' , {root: __dirname});
})
// Losbeat Create Account Page
app.get('/create' , (req , res) =>{
    user.find()
    .then((result) => res.sendFile('./Views/signup.html' , {root: __dirname}))
    .catch((err) => console.log(err))
 })
// Losbeat Login Page
 app.get('/login' , (req , res) => {
   login.find()
   .then((result) => res.sendFile('./Views/Join.html' , {root: __dirname}))
   .catch((err) => console.log(err))
})
app.post('/login' , (req , res) => {
   const logins = new login(req.body);
   logins.save()
   .then((result) => {
        res.redirect('/homepage');
   })
   .catch((err) => {
       console.log(err)
   })
})
// Losbeat Family PAge
app.get('/family' , (req , res) => {
   res.sendFile('./Views/Family.html' , {root: __dirname})
})
// Losbeat HomePage
 app.get('/homepage' , (req,res) =>[
    user.find()
    .then((result) => res.sendFile('./Views/HomeLanding.html' , {root: __dirname}))
    .catch((err) => console.log(err))
 ])
 // Losbeat Discover Page
 app.get('/discover' , (req , res) => {
    res.sendFile('./Views/Discover.html' , {root: __dirname});
 })
 // Losbeat Subscription Page
 app.get('/subscription' , (req , res) => {
    res.sendFile('./Views/Plans.html' , {root: __dirname})
 })
 // Losbeat Forgot Password
app.get('/forgotpassword' , (req , res) => {
   res.sendFile('./Views/forgotpassword.html' , {root: __dirname})
})
// Reset Password
app.get('/Resetpassword' , (req , res) => {
   res.sendFile('./Views/afterforgot.html' , {root: __dirname})
})
// Losbeat Premium Duo Page
app.get('/duo' , (req , res) => {
   res.sendFile('./Views/Duo.html' , {root:__dirname})
})
// Losbeat Premium Page
app.get('/premium' , (req , res) => {
   res.sendFile('./Views/purchase.html' , {root:__dirname})
})
app.post('/create/homepage', (req, res) => {
   const users = new user(req.body);
   users.save()
   .then((result) => {
        res.redirect('/homepage');
   })
   .catch((err) => {
       console.log(err)
   })
});

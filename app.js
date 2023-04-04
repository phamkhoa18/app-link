const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const mongoose = require('mongoose');
const app = express() ;
const Links = require('./models/shortlink');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

// CONNECT MONGOOSE 
mongoose.connect('mongodb+srv://admin:admin@rut-gon-link.qszggfc.mongodb.net/?retryWrites=true&w=majority') 
    .then(() => {
        console.log('Connect database');
    })
    .catch((err) => {
        console.log(err);
    })

// HOME -- GET
app.get('/' , (req,res) => {
    res.render('home');
})

// HOME -- POST
app.post('/' , (req , res) => {
    const newlink = `http://localhost:3000/${shortid.generate()}`
    const link = new Links({
        oldlink : req.body.shortlink ,
        newlink : newlink 
    })
    link.save();
    res.redirect('/list');
    
})

// LIST -- GET
app.get('/list' , (req,res) => {
    Links.find()
        .then((data) => {
            res.render('list' , {data : data});
        })
        .catch((err) => {
            res.send(err);
        })
})

// FIND/:ID -- GET
app.get('/:id' , (req,res) => {    
Links.findOneAndUpdate({newlink : `http://localhost:3000/${req.params.id}`} ,
                        {$inc : {numberofvisit : 1} } ,
                        {new : true})
            .then((value) => {
                if(value) res.redirect(value.oldlink);
                else res.send("Không tìm thấy !!!");
            })
            .catch((err) => {
                res.send('Lỗi ko tìm thấy !!!' + err)
            })

})


app.listen(3000,() => {
    console.log('server run');
})
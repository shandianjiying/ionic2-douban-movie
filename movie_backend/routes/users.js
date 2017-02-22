/**
 * Created by ShaunJ on 17/1/22.
 */
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
// const methodOverride = require('method-override')


router.use(bodyParser.urlencoded({ extended: true }))
// router.use(methodOverride(function(req, res){
//     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//         // look in urlencoded POST bodies and delete it
//         var method = req.body._method
//         delete req.body._method
//         return method
//     }
// }))

//查看所有users
router.get('/',(req,res)=>{
    mongoose.model('User').find({},(err,users)=>{
        if(err){
            res.json(err)
        }else{
            res.json(users)
        }
    })
})

//新增user
router.post('/',(req,res)=>{
    var data = req.body;
    mongoose.model('User').create(data,(err,user)=>{
        if(err){
            res.json(err)
        }else {
            res.json(user)
        }
    }).then(function(){
        res.send('ok');
    })
})

//上传头像
router.post('/uploadHeadImg',(req,res)=>{
    let sampleFile;
    if(!req.files){
        res.send('No files were uploaded.');
        return;
    }
    sampleFile = req.files.sampleFile;
    sampleFile.mv('/public/upload/filename.jpg', function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    })
})




module.exports = router;
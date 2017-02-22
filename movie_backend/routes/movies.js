/**
 * Created by ShaunJ on 17/2/21.
 */
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

router.get('/',(req,res)=>{
    let tasks = [];
    tasks.push(new Promise((resolve,reject)=>{
        let query = mongoose.model('Movie').find({"isOnSale":true});
        query.skip(0).limit(6);
        query.exec((err,docs)=>{
            if(err){
                reject(err)
            }else{
                resolve(docs)
            }
        })
    }))

    tasks.push(new Promise((resolve,reject)=>{
        let query = mongoose.model('Movie').find({"isOnSale":false});
        query.skip(0).limit(6);
        query.exec((err,docs)=>{
            if(err){
                reject(err)
            }else{
                resolve(docs)
            }
        })
    }))

    Promise.all(tasks).then((data)=>{
        var result = {}
        if(data && data.length>0){
            result.inTheater = data[0]
            result.comingSoon = data[1]
        }
        res.send(result)
    })


})

module.exports = router;
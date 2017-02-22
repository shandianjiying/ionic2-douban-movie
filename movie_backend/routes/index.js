/**
 * Created by ShaunJ on 17/1/22.
 */
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const http = require('http')
const q = require('q')


router.get('/',(req,res,next)=>{
    res.send('welcome to mongo world!')
})

//登录
router.post('/login',(req,res)=>{
    let name = req.body.nickname,
        password = req.body.password
    try{
        mongoose.model('User').find({
            nickName:name,
            password:password
        },(err,user)=>{
            if(err){
                res.status(500)
            }else{
                if(user.length>0){
                    delete user[0]._doc.password
                    res.send(user[0])
                }else{
                    res.send({'err':'没有此用户!'})
                }
            }
        })
    }catch (err){
        console.log(err)
        res.send(err)
    }

})

//刷新后端数据
router.get('/refreshData',(req,res)=>{
    let tasks = [];
    //先清空movie表里的数据
    tasks.push(new Promise((resolve,reject)=>{
        mongoose.model('Movie').remove({},(err)=>{
            if(err){
                reject(err)
            }else{
                resolve({})
            }
        });

    }))

    //新增热映的电影
    tasks.push(new Promise((resolve,reject)=>{
        http.get('http://api.douban.com/v2/movie/in_theaters',(_res)=>{
            _res.setEncoding('utf8');
            var body = '';
            _res.on('data', function(data) {
                body += data;
            });
            _res.on('end',function(){
                let parsed = JSON.parse(body);
                let arr = [];
                parsed.subjects.forEach((item)=>{
                    arr.push({
                        name:item.title,
                        imageUrl:item.images.large,
                        desc:item.alt,
                        actor:item.casts[0].name,
                        isOnSale:true
                    })
                })
                mongoose.model('Movie').insertMany(arr,(err,docs)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(docs)
                    }
                })
            })

        }).on('error', (e) => {
            reject(e)
        });
    }))

    //新增即将上映的电影
    tasks.push(new Promise((resolve,reject)=>{
        http.get('http://api.douban.com/v2/movie/coming_soon',(_res)=>{
            _res.setEncoding('utf8');
            var body = '';
            _res.on('data', function(data) {
                body += data;
            });
            _res.on('end',function(){
                let parsed = JSON.parse(body);
                let arr = [];
                parsed.subjects.forEach((item)=>{
                    arr.push({
                        name:item.title,
                        imageUrl:item.images.large,
                        desc:item.alt,
                        actor:item.casts[0].name,
                        isOnSale:false
                    })
                })
                mongoose.model('Movie').insertMany(arr,(err,docs)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(docs)
                    }
                })
            })

        }).on('error', (e) => {
            reject(e)
        });
    }))

    let data = Promise.all(tasks)
    console.log(data)
    res.send(data)

})

module.exports = router;
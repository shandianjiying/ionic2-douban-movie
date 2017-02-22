/**
 * Created by ShaunJ on 17/2/21.
 */
const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name: {type:String}, //电影名称
    desc:{type:String}, //电影介绍
    actors:{type:String}, //主演
    imageUrl: {type:String}, //主图
    imageList:{type:String}, //图组
    isOnSale:{type:Boolean} //0:未上映 1:上映
});
mongoose.model('Movie', movieSchema);
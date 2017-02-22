/**
 * Created by ShaunJ on 17/1/22.
 */
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    idName: {type:String}, //身份证姓名
    credit:{type:String}, //身份证
    nickName:{type:String,unique: true}, //昵称 唯一
    password: {type:String}, //密码
    headImg:{type:String}, //头像
    phone:{type:String}, //手机
    sex:{type:Boolean}, //性别 true男 false女
    country:{type:String}, //国家
    province:{type:String}, //省份
    city:{type:String}, //城市
    birthday:{type:Date}, //生日
    email:{type:String}, //邮箱
    showPhoneToFriends:{type:Boolean} //朋友可见手机 true可见 false不可见
});
mongoose.model('User', userSchema);
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
    templateUrl: 'userDetail.html'
})

export class UserDetail {
    public base64ImageData:string;
    constructor(private navCtrl:NavController) {
        
    }

    //拍照
    takePicture(){
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetHeight:500,
            targetWidth:500
        }).then((ImageData)=>{
            this.base64ImageData = "data:image/jpeg;base64," + ImageData;
        },(err)=>{
            console.log(err)
        })
    }

    //从相册选取
    openGallery(){
        let cameraOptions = {
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            DestinationType: Camera.DestinationType.FILE_URI,
            quality: 100,
            targetWidth:500,
            targetHeight:500,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true
        }
        Camera.getPicture(cameraOptions).then((file_uri)=>{
            this.base64ImageData = file_uri
        },(err)=>{
            console.log(err)
        })
    }

    goBack(){
        this.navCtrl.pop();
    }
}
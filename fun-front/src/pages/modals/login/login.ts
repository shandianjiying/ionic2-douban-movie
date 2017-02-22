import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { HttpService } from '../../../services/HttpService';

@Component({
    templateUrl: 'login.html',
    providers:[HttpService]
})

export class Login {
    data:any;
    constructor(private viewCtrl:ViewController, private httpService:HttpService) {
        this.data = {};
        this.data.nickname = "";
        this.data.password = "";
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }

    login(){
        this.httpService.login(this.data).subscribe((data)=>{
            console.log(data);
            this.viewCtrl.dismiss(data);
        },(err)=>{
            console.log(err);
        })
    }
}
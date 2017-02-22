import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { HttpService } from '../../../services/HttpService';

@Component({
    templateUrl: 'register.html',
    providers: [HttpService]
})

export class Register {
    data: any;
    constructor(private viewCtrl: ViewController, private httpService: HttpService) {
        this.data = {};
        this.data.nickName = '';
        this.data.password = '';
        this.data.passconfirm = '';
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    register() {
        if (this.data.password === this.data.passconfirm) {
            var req = {
                nickName:this.data.nickName,
                password:this.data.password
            }
            this.httpService.register(req).subscribe((data) => {
                console.log(data);
                this.viewCtrl.dismiss();
            }, (err) => {
                console.log(err);
            })
        }else{
            
        }

    }
}
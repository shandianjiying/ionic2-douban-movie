import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Login } from '../modals/login/login';
import { Register } from '../modals/register/register';
import { GlobalVarsService } from '../../services/GlobalVarService'
import { UserDetail } from '../userDetail/userDetail';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private global:GlobalVarsService) {

  }

  openLoginModal() {
    let modal = this.modalCtrl.create(Login);
    modal.onDidDismiss(data=>{
      // console.log(data)
      if(data){this.global.setUser(data);}
    });
    modal.present();
  }

  openRegisterModal(){
    let modal = this.modalCtrl.create(Register);
    modal.present();
  }

  showImg(){
    if(this.global.user.nickName){
      this.navCtrl.push(UserDetail);
    }else{
      alert('请登录')
    }
    
  }

  //退出登录
  logout(){
    this.global.setUser({});
  }

}

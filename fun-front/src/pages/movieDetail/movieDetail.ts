import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HttpService } from '../../services/HttpService';

@Component({
  selector: 'movie-detail',
  templateUrl: 'movieDetail.html',
  providers:[HttpService]
})
export class MovieDetail {
  
  constructor(public navCtrl: NavController, private httpService: HttpService) {
    
  }

  goBack(){
    this.navCtrl.pop()
  }

}

import { Component } from '@angular/core';

import { App,NavController } from 'ionic-angular';
import { HttpService } from '../../services/HttpService';
import { MovieDetail } from '../movieDetail/movieDetail';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpService]
})
export class HomePage {
  private movieList: any;
  private comingList: any;
  constructor(public navCtrl: NavController, private httpService: HttpService,private app:App) {
    this.movieList = [];
    this.comingList = [];
  }

  ngOnInit() {
    this.httpService.getMoviewList().subscribe((data) => {
      if(data.inTheater && data.inTheater.length>0){
        data.inTheater.forEach(item=>{
          this.movieList.push(item)
        })
      }

      if(data.comingSoon && data.comingSoon.length>0){
        data.comingSoon.forEach(item=>{
          this.comingList.push(item)
        })
      }
      console.log(this.movieList)
    }, (err) => {
      console.log(err);
    })
  }

  moreInTheater(){
    let nav = this.app.getRootNav();
    nav.push(MovieDetail);
    // this.navCtrl.push(MovieDetail);
    
  }

  moreComing(){
    this.navCtrl.push(MovieDetail);
  }

}

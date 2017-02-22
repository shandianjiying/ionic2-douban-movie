import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HttpService } from '../../services/HttpService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpService]
})
export class HomePage {
  private movieList: any;
  private comingList: any;
  constructor(public navCtrl: NavController, private httpService: HttpService) {
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

}

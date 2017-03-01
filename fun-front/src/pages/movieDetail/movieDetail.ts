import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import { HttpService } from '../../services/HttpService';

@Component({
  selector: 'movie-detail',
  templateUrl: 'movieDetail.html',
  providers:[HttpService]
})
export class MovieDetail {
  private movie = {};
  private fetchData:any;
  constructor(public navCtrl: NavController, private httpService: HttpService,private params:NavParams) {
    this.movie = this.params.data;
    this.fetchData = {};
  }

  goBack(){
    this.navCtrl.pop()
  }

  ngOnInit(){
    let id = this.params.data.doubanId;
    //获取海报（暂时没有此接口，现在调用的是获取电影条目数据）
    this.httpService.getPhotos(id,0,10).subscribe((data)=>{
      this.fetchData.original_title = data.original_title;
      this.fetchData.summary = data.summary;
    })
  }

}

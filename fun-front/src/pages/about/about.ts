import { Component,ViewChild,ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var BMap;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})


export class AboutPage {
  @ViewChild('container') mapElement: ElementRef;
  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
    this.loadMap();
  }

  loadMap(){
    var map = new BMap.Map(this.mapElement.nativeElement);
    map.centerAndZoom(new BMap.Point(121.487, 31.249), 11);  // 初始化地图,设置中心点坐标和地图级别
	  map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity(new BMap.Point(121.487, 31.249));
	  map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
	  map.enableScrollWheelZoom(true);
  }

}

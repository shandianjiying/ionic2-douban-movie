import { Component,ViewChild,ElementRef } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { LocationSearchModalPage } from "./location-search-modal/location-search-modal";
import { LocationNavPage } from "./location-nav-modal/location-nav-modal";
import { NativeService } from '../../services/NativeService';

declare var AMap;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})


export class AboutPage {
  @ViewChild('map_container') map_container: ElementRef;

  mapIsComplete: boolean = false;//地图是否加载完成
  showIonFab: boolean = false;//是否显示路线按钮
  isPositioning: boolean = false;//是否正在定位
  map: any;//地图对象
  marker: any;//地图坐标点信息

  constructor(private modalCtrl: ModalController,
              private nativeService: NativeService) {

  }

  ngOnInit(){
    setTimeout(() => this.loadMap(), 1000);//1秒后加载地图
    let loadNum = 0;
    let interval = setInterval(() => {//10秒后检测地图是否加载成功
      if (!this.map && loadNum < 5) {
        this.loadMap();
      } else {
        clearInterval(interval);
      }
    }, 10000);
  }

  loadMap(){
    let that = this;
    try {
      that.map = new AMap.Map(this.map_container.nativeElement, {
        view: new AMap.View2D({//创建地图二维视口
          zoom: 11, //设置地图缩放级别
          rotateEnable: true,
          showBuildingBlock: true
        })
      });

      that.map.on('complete', function () {
        that.mapIsComplete = true;
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {//添加工具条和比例尺
          that.map.addControl(new AMap.ToolBar());
          that.map.addControl(new AMap.Scale());
        });
      });
      window['AboutAMap'] = this.map;
    } catch (err) {
      that.mapIsComplete = false;
      that.nativeService.showToast('地图加载失败,请检查网络或稍后再试.')
    }
  }

  ionFocus() {
    let that = this;
    let modal = this.modalCtrl.create(LocationSearchModalPage);
    modal.present();
    modal.onDidDismiss(marker => {
      if (marker) {
        that.showIonFab = true;
        that.map.clearMap();
        that.marker = new AMap.Marker({
          map: that.map,
          id: marker.id,
          position: new AMap.LngLat(marker.location.lng, marker.location.lat),
          extData: marker,
          title: marker.name
        });
        that.map.setFitView();
        that.map.setZoom(16);
      }
    });
  }

  mapLocation() {
    debugger
    let that = this;
    that.isPositioning = true;
    that.nativeService.getUserLocation().then(position => {
      that.map.clearMap();
      that.marker = new AMap.Marker({
        map: that.map,
        position: new AMap.LngLat(position['lng'], position['lat']),
      });
      that.map.setFitView();
      that.map.setZoom(16);
      that.isPositioning = false;
    }, () => {
      that.isPositioning = false;
    });
  }

  mapNavigation(navigationType) {//1驾车,2公交,3步行
    let markerData = this.marker.getExtData();
    let modal = this.modalCtrl.create(LocationNavPage, {'navigationType': navigationType, 'markerLocation': {'lng': markerData.location.lng, 'lat': markerData.location.lat}});
    modal.present();
    modal.onDidDismiss(marker => {
      if (marker) {
      }
    });
  }
  

}

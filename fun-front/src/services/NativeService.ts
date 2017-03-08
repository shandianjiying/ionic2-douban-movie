import {Injectable} from '@angular/core';
import {ToastController, LoadingController, Platform, Loading, AlertController} from 'ionic-angular';
import {Camera, AppVersion, Toast, ImagePicker, Transfer, FileOpener, File, InAppBrowser} from 'ionic-native';
import {ANDROID_APK} from "./Constants";
declare var LocationPlugin;
declare var AMapNavigation;
declare var cordova: any;

@Injectable()
export class NativeService {
  constructor(private platform: Platform,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast = (message: string = '操作完成', duration: number = 2000) => {
    if (this.isMobile()) {
      Toast.show(message, String(duration), 'center').subscribe();
    } else {
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
    }
  };


  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile() {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid() {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos() {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }
  /**
   * 获得用户当前坐标
   * @return {Promise<T>}
   */
  getUserLocation() {
    return new Promise((resolve, reject) => {
      if (this.isMobile()) {
        LocationPlugin.getLocation(data => {
          resolve({'lng': data.longitude, 'lat': data.latitude});
        }, msg => {
          console.error('定位错误消息' + msg);
          alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
          reject('定位失败');
        });
      } else {
        console.log('非手机环境,即测试环境返回固定坐标');
        resolve({'lng': 121.487, 'lat': 31.249});
      }
    });
  }

  /**
   * 地图导航
   * @param startPoint 开始坐标
   * @param endPoint 结束坐标
   * @param type 0实时导航,1模拟导航,默认为模拟导航
   * @return {Promise<T>}
   */
  navigation(startPoint, endPoint, type = 1) {
    return new Promise((resolve, reject) => {
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        AMapNavigation.navigation({
          lng: startPoint.lng,
          lat: startPoint.lat
        }, {
          lng: endPoint.lng,
          lat: endPoint.lat
        }, type, function (message) {
          resolve(message);//非手机环境,即测试环境返回固定坐标
        }, function (message) {
          alert('导航失败:' + message);
          reject('导航失败');
        });
      } else {
        this.showToast('非手机环境不能导航');
      }
    });
  }
}
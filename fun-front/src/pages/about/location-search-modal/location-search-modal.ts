import {Component, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';

import {ViewController, Searchbar} from 'ionic-angular';
import {NativeService} from "../../../services/NativeService";
declare var AMap;

@Component({
  selector: 'page-location-search-modal',
  templateUrl: 'location-search-modal.html'
})

export class LocationSearchModalPage {
  @ViewChild('searchBar') searchBar: Searchbar;
  searchQuery: string = '';
  items: any[] = [];
  placeSearch;

  constructor(private viewCtrl: ViewController,
              private storage: Storage,
              private nativeService: NativeService) {
    AMap.service('AMap.PlaceSearch', () => {//地点查询插件
      this.placeSearch = new AMap.PlaceSearch({
        pageSize: 10,
        pageIndex: 1,
        city: '上海市'
      });
    });
    this.storage.get('MapSearchHistory').then(items => {
      this.items = (items || []).reverse();
    });
  }

  ionViewDidEnter() {
    this.searchBar.setFocus();
  }

  getSearchData(val) {
    return new Promise((resolve) => {
      if (val && val.trim() != '') {
        this.placeSearch.search(val, (status, result) => {
          if (status == 'complete') {
            resolve(result.poiList.pois);
          } else if (status == 'no_data') {
            this.nativeService.showToast('没有找到匹配结果,请精确查询条件')
          } else {
            this.nativeService.showToast('地图查询失败,稍后再试.')
          }
        });
      }
    });
  }

  getItemss(ev) {
    this.getSearchData(ev.target.value).then(list => this.items = <any[]>list);
  }

  selectItem(item) {
    this.storage.get('MapSearchHistory').then(items => {
      if (items) {
        let isExist = false;
        for (let value of items) {
          if (value.id === item.id) {
            isExist = true;
          }
        }
        if (!isExist) {
          items.push(item);
        }
      } else {
        items = [item]
      }
      this.storage.set('MapSearchHistory', items);
    });
    this.viewCtrl.dismiss(item);
  }

  clearHistory() {
    this.storage.remove('MapSearchHistory');
    this.items = [];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import {AboutPage} from './about';
import { LocationNavPage } from "./location-nav-modal/location-nav-modal";
import { LocationSearchModalPage } from "./location-search-modal/location-search-modal";
@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  declarations: [AboutPage,LocationNavPage, LocationSearchModalPage],
  entryComponents: [AboutPage,LocationNavPage, LocationSearchModalPage],
  providers: [],
  exports: [IonicModule]
})
export class MapModule {
}

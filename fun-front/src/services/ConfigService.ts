import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService{
    hostUrl:string = 'http://192.168.100.214:3000';

    constructor(){

    }

    getHost(){
        return this.hostUrl;
    }
}
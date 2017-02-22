import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVarsService{

    user:any;
    constructor(){
        this.user = {};
    }

    setUser(value){
        this.user = value;
    }

    getUser(){
        return this.user;
    }
}
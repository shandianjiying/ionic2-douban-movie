import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HttpService } from '../../services/HttpService';

@Component({
  selector: 'movie-list',
  templateUrl: 'movieList.html',
  providers:[HttpService]
})
export class MovieList {
  private movieStatus = ''
  private pagination:any
  private movies= []
  constructor(public navCtrl: NavController, private httpService: HttpService) {
    this.movieStatus = 'inTheater'
    this.pagination = {}
    this.pagination.page = 1
    this.pagination.count = 20
  }

  goBack(){
    this.navCtrl.pop()
  }

  segChanges(status){
    this.movieStatus = status
    this.pagination.page = 1
    this.loadMovies()
  }

  loadMovies(){
    if(this.movieStatus==='inTheater'){
        this.httpService.getInTheater(this.pagination.page,this.pagination.count).subscribe((data)=>{
            if(data && data.length>=0)
                this.movies = data
        })
    }else{
        this.httpService.getComingSoon(this.pagination.page,this.pagination.count).subscribe((data)=>{
            if(data && data.length>=0)
                this.movies = data
        })
    }
  }

  ngOnInit(){
      this.loadMovies()
  }

}
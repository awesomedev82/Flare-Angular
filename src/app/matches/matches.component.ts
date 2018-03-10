import { Component, OnInit, Input } from '@angular/core';

import { TinderService } from '../services/tinder.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

matches: Match[];
token: string = null;

totalMatches: string[];
totalMatchesNumber: number;

pageNumber: number = 0;

loadingIndicator;

  constructor(private service: TinderService) { }

  ngOnInit(){
    this.getTinderMatches();
    //this.getTotalAmountOfMatches();
    //this.getUpdates();

    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
  }

  getTinderMatches(){
    this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "inline-block";
    this.service.getMatches(this.token).subscribe(data => {
      console.log(data.data.matches);
      this.matches = data.data.matches;
      this.token = data.data.next_page_token;

      this.pageNumber += 1;
      
      console.log(this.pageNumber);
      //console.log(this.token);
    })

    this.scrollToTop();

    setTimeout(() => {
      this.loadingIndicator = document.getElementById('loadingIndicator').style.display = "none";
    },
      1500);
  }

  deleteTinderMatch(id: string){
    this.service.deleteMatch(id).subscribe(data => {
      console.log(data);
    })
  }

  removeFromList(profile, status){
    console.log(status);
    let index = this.matches.indexOf(profile);
    this.matches.splice(index, 1)
  }

  getUpdates(){
    this.service.getUpdates().subscribe(data => {
      console.log("TEST");
      console.log(data);
    })
  }

  openImage(url: string){
    window.open(url);
  }

  scrollToTop(){
    window.scrollTo(0, 0);
  }

  getTotalAmountOfMatches(){
    this.service.getTotalAmountOfMatches(this.token).subscribe(data => {
      //console.log(data.data.matches);
      this.totalMatches += data.data.matches;
      this.totalMatchesNumber = this.totalMatches.length;
      console.log(this.totalMatchesNumber);
      this.token = data.data.next_page_token;
      //console.log(this.token);
    })
  }

}

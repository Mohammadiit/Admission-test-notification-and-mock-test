import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(public questionService: QuestionService,
              private router: Router) { }
  L=0;
  W=0;
  D=0;
  R=0;
  estimate = 0;

  ngOnInit() {
    this.assignValue();

  }

  private assignValue() {
      this.D = this.questionService.D;
     this.R =this.questionService.R ;
     this.W =this.questionService.W ;
     this.L =this.questionService.L ;
     // this.estimate = (24/11) + Math.log(5/6) / Math.log(2.718);
    let e;
     if(this.R ==0 || this.W ==0){
       if(this.R ==0)  e = (this.D/this.L) + (Math.log((this.R+.5)/(this.W-0.5)) / Math.log(2.718));
       if(this.W ==0)  e = (this.D/this.L) + (Math.log((this.R-.5)/(this.W+0.5)) / Math.log(2.718));
     }
     else{
       e = (this.D/this.L) + (Math.log(this.R/this.W) / Math.log(2.718));
     }
     e = Number((e).toFixed(2));
      this.estimate = (e+1.89)*10;
  }
}

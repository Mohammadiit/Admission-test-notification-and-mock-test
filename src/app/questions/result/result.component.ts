import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {QueryServiceService} from '../../shared/service/query-service.service';
import {SharedService} from '../../shared/service/shared.service';
export interface PeriodicElement {
  Question : string,
  Difficulties: number,
  Answer : string,
  Right : string,
}
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  url;

  displayedColumns: string[] = [ 'Question', 'Difficulties', 'Answer', 'Right'];
  data : PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);

  constructor(public questionService: QuestionService,
              private queryService: QueryServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.url = activatedRoute.snapshot.url[1].path;
  }
  L=0;
  W=0;
  D=0;
  R=0;
  estimate = 0;
  QuestionAttempt = [];
  Difficulty = [];
  Answer = [];
  Results = [];
  examInfo;
  
  ngOnInit() {

    this.queryService.getSingleData('exam-result', this.url).subscribe(res =>{
      this.examInfo = res;
      this.QuestionAttempt = this.examInfo.QuestionAttempt;
      console.log(this.QuestionAttempt);
      this.Difficulty = this.examInfo.Difficulty;
      this.Answer = this.examInfo.Answer;
      this.Results = this.examInfo.Results;

      this.D = this.examInfo.D;
      this.R = this.examInfo.R;
      this.W = this.examInfo.W;
      this.L = this.examInfo.L;

      console.log(res);
    });

    this.loadData();

    this.assignValue();

  }

  private loadData() {
    for(let i =0;i<this.QuestionAttempt.length;++i){
      this.data[i]={
        Question : this.QuestionAttempt[i],
        Difficulties: this.Difficulty[i] ,
        Answer : this.Answer[i],
        Right : this.Results[i],
      }
    }
  }

  private assignValue() {

    console.log(this.Results);
    console.log(this.Difficulty);
    console.log(this.Answer);
    console.log(this.QuestionAttempt);

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

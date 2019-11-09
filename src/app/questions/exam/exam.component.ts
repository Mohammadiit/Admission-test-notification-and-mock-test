import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../services/question.service';
import {NavigationStart, Router} from '@angular/router';
import {question} from '../../config/interfaces/question.interface';
import {urlPaths} from '../../config/constants/defaultConstants';
import {Observable, Subscription} from 'rxjs';
import {QueryServiceService} from '../../shared/service/query-service.service';
import * as moment from 'moment';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(public questionService: QuestionService,
              private queryService: QueryServiceService,
              private router: Router) { }
  questionPaper;
  questionAttempt = [];
  statement;
  public questions: question[][] = [ [],[] ] ;
  options = [];
  iterator = 0;
  column = 2;
  selected = null;
  disabled = true;
  difficulty ;
  L=0;
  W=0;
  D=0;
  R=0;
  type;
  interval;
  contest;
  isContest = true;
  duration;
  time; contestId;
  userName;
  estimate;
  interval2;
  subscription: Subscription;
  correctAnswer = null; correct = false; wrong = false;
  attendedDifficulties = [];

  ngOnInit() {
    // this.router.navigate(['**']);

    // this.finish();
    // this.questionService.update();
    // this.getUserName().subscribe(res=>{
    //   console.log(res);
    // });



    let url = this.router.url;
    console.log(url + "      "+ url.length +'     '+url.indexOf('contest'));
    this.type = url.substring(16,23);
    let questionId = url.substring(43,63);
    this.contestId = url.substring(16,36);
    console.log(url.substring(16,36)+ '   '+url.substring(43,63));

    if (url.indexOf('contest')) {
      this.isContest = true;
      this.queryService.getSingleData('contests',this.contestId).subscribe(res =>{
        this.contest = res;
        this.calculateDuration();
        console.log(res);
      });
      this.queryService.getSingleData('question-paper', questionId).subscribe(res =>{
        this.questionPaper = res;
        this.loadProjects();
        this.questionShow();
        console.log(this.questionPaper.question1.statements);
      });

      this.timeCheck();

    }




    if (this.questionService.questionPaper != undefined) {
      this.questionPaper = this.questionService.questionPaper;
      this.loadProjects();
      this.questionShow();
      // console.log( this.questions[this.iterator].statements);
    }
    else {}
  }

  private calculateDuration() {
    var contestTimeWithDuration = moment(this.contest.startTime).add(this.contest.duration, 'm').toDate();
    var diff = contestTimeWithDuration - new Date();
    this.duration = Math.floor((diff/1000));
    console.log("Timmmmmmmmmmmmmmmmmmmmmmm       "+ this.duration);
    if(this.duration <= 0) {
      this.router.navigate(['**']);
    }
  }

  private timeCheck() {
    this.interval = setInterval(() => {
      if(this.duration == 0) this.finish();
      this.time = moment().startOf('day')
        .seconds(this.duration)
        .format('H:mm:ss');
      // console.log('time          '+this.time);
      --this.duration;
    },1000);
  }

  private questionShow() {
    ++this.L;
    this.D+= Number(this.questions[this.column][this.iterator].difficulties);
    this.disabled = true;
    this.correct = false;
    this.wrong = false;
    this.statement =  this.questions[this.column][this.iterator].statements;
    let i = 0;

    this.options[i] =  this.questions[this.column][this.iterator].a;
    this.options[++i] =  this.questions[this.column][this.iterator].b;
    this.options[++i] =  this.questions[this.column][this.iterator].c;

    this.options[++i] =  this.questions[this.column][this.iterator].d;


    this.questionAttempt.push( this.statement);
    this.correctAnswer = this.questions[this.column][this.iterator].answer;
    this.difficulty = this.questions[this.column][this.iterator].difficulties;
    this.attendedDifficulties.push(this.difficulty);


  }

  next() {

    if(this.iterator <10){
      let answer =  this.questions[this.column][this.iterator].answer;
      console.log( "kkkkkkk  " + this.selected + "      " + answer);
      this.iterator = -1;
      if ( answer == this.selected) {
          ++this.R;
          this.calculateEstimate();
        if (this.column < 4 ) ++this.column;

        this.proceedOn();
      }
      else {
        ++this.W;
        this.calculateEstimate();


        if (this.column > 0 ) --this.column;

        this.proceedOn();
        // console.log(" Correnct  "+ this.answers.get(answer));
      }
    }
    else{
      this.finish();
    }
  }

  calculateEstimate(){
      let sum = this.sumPm();
      console.log ("summmmmmmmmmmmmmmmmmmm          "+sum);
      this.column = Math.round(this.column +((this.R - sum[0])/sum[1]));
      this.column;
  }
  sumPm(){
      let pm1 = 0;
      let pm2 = 0;
      let i=0;
      for(i =0 ;i<this.attendedDifficulties.length;++i){
        let x = Math.exp((this.column+1)-this.attendedDifficulties[i]);
        let newPm = (x/(1+x));
        pm1 += newPm;
        pm2 += (newPm * (1-newPm));
      }
      let res = [];
      res.push(pm1);
      res.push(pm2);
      return res;
  }
  finish(){
    if(this.isContest){
      this.getUserName().subscribe(res=>{
        console.log(res);
        this.estimateMark();
        let payload = res.metaData.fullName + ':' +this.estimate;
        this.questionService.upadateArrayField('contests',
          this.contestId,'marks',payload);
        let time = 0;



        this.router.navigate(['home']);
        console.log(this.estimate);
      });
    }
    else{
      this.questionService.D = this.D;
      this.questionService.R = this.R;
      this.questionService.W = this.W;
      this.questionService.L = this.L;
      this.router.navigate([urlPaths.Question.result.url]);
    }
  }

  private estimateMark() {
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
  private getUserName(): Observable<any>  {
  let user;
    return new Observable((observer) => {
      this.queryService.getLoggedInUserID().subscribe(res =>{
        this.queryService.getSingleData('users',res).subscribe((res2 =>{
          user = res2;
          console.log(user.metaData.fullName);
          observer.next(res2);
        }))

      })
    })



  }
  private easier() {

    while (1==1){
      if(this.questionAttempt.indexOf(this.questions[this.column][--this.iterator].statements) == -1) {
        this.questionShow();
        break;
      }
      if(this.iterator < 0) {
        break;
      }
    }
  }
  private proceedOn() {
    while (1==1){
      if(this.iterator >= 9) {
        this.finish();
      }
      if(this.questionAttempt.indexOf(this.questions[this.column][++this.iterator].statements) == -1) {
          this.questionShow();
          break;
      }

    }
  }
  private loadProjects() {
    for(var key: number = 0; key < 5; key++) {
      this.questions[key] = [];

    }
    let i=0,j=0;
    this.questions[j][i] = this.questionPaper.question1;
    this.questions[j][++i] = this.questionPaper.question2;
    this.questions[j][++i] = this.questionPaper.question3;
    this.questions[j][++i] = this.questionPaper.question4;
    this.questions[j][++i] = this.questionPaper.question5;
    this.questions[j][++i] = this.questionPaper.question6;
    this.questions[j][++i] = this.questionPaper.question7;
    this.questions[j][++i] = this.questionPaper.question8;
    this.questions[j][++i] = this.questionPaper.question9;
    this.questions[j][++i] = this.questionPaper.question10;
    i =-1; ++j;
    this.questions[j][++i] = this.questionPaper.question11;
    this.questions[j][++i] = this.questionPaper.question12;
    this.questions[j][++i] = this.questionPaper.question13;
    this.questions[j][++i] = this.questionPaper.question14;
    this.questions[j][++i] = this.questionPaper.question15;
    this.questions[j][++i] = this.questionPaper.question16;
    this.questions[j][++i] = this.questionPaper.question17;
    this.questions[j][++i] = this.questionPaper.question18;
    this.questions[j][++i] = this.questionPaper.question19;
    this.questions[j][++i] = this.questionPaper.question20;
    i =-1; ++j;

    this.questions[j][++i] = this.questionPaper.question21;
    this.questions[j][++i] = this.questionPaper.question22;
    this.questions[j][++i] = this.questionPaper.question23;
    this.questions[j][++i] = this.questionPaper.question24;
    this.questions[j][++i] = this.questionPaper.question25;
    this.questions[j][++i] = this.questionPaper.question26;
    this.questions[j][++i] = this.questionPaper.question27;
    this.questions[j][++i] = this.questionPaper.question28;
    this.questions[j][++i] = this.questionPaper.question29;
    this.questions[j][++i] = this.questionPaper.question30;
    i =-1; ++j;

    this.questions[j][++i] = this.questionPaper.question31;
    this.questions[j][++i] = this.questionPaper.question32;
    this.questions[j][++i] = this.questionPaper.question33;
    this.questions[j][++i] = this.questionPaper.question34;
    this.questions[j][++i] = this.questionPaper.question35;
    this.questions[j][++i] = this.questionPaper.question36;
    this.questions[j][++i] = this.questionPaper.question37;
    this.questions[j][++i] = this.questionPaper.question38;
    this.questions[j][++i] = this.questionPaper.question39;
    this.questions[j][++i] = this.questionPaper.question40;
    i =-1; ++j;

    this.questions[j][++i] = this.questionPaper.question41;
    this.questions[j][++i] = this.questionPaper.question42;
    this.questions[j][++i] = this.questionPaper.question43;
    this.questions[j][++i] = this.questionPaper.question44;
    this.questions[j][++i] = this.questionPaper.question45;
    this.questions[j][++i] = this.questionPaper.question46;
    this.questions[j][++i] = this.questionPaper.question47;
    this.questions[j][++i] = this.questionPaper.question48;
    this.questions[j][++i] = this.questionPaper.question49;
    this.questions[j][++i] = this.questionPaper.question50;
    console.log(this.questions);


  }


  enableButton() {
    console.log( "kkkkkkk  " + this.selected + "      " + this.correctAnswer);


    this.disabled = false;
  }
  //
  lock() {
    if ( this.correctAnswer == this.selected) {
      this.correct = true;
    }
    else  this.wrong = true;
  }
}

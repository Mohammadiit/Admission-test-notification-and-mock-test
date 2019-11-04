import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../services/question.service';
import {NavigationStart, Router} from '@angular/router';
import {question} from '../../config/interfaces/question.interface';
import {urlPaths} from '../../config/constants/defaultConstants';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(public questionService: QuestionService,
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
  subscription: Subscription;
  correctAnswer = null; correct = false; wrong = false;
  ngOnInit() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let browserRefresh = !this.router.navigated;
        console.log("kkk   " + browserRefresh);
      }
    });
    if (this.questionService.questionPaper != undefined) {
      this.questionPaper = this.questionService.questionPaper;
      this.loadProjects();
      this.questionShow();
      // console.log( this.questions[this.iterator].statements);
    }
    else {

    }


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
  }

  next() {

    if(this.iterator <10){
      let answer =  this.questions[this.column][this.iterator].answer;
      console.log( "kkkkkkk  " + this.selected + "      " + answer);
      this.iterator = -1;
      if ( answer == this.selected) {
        if (this.column < 4 ) ++this.column;
          ++this.R;
         this.proceedOn();
      }
      else {
        ++this.W;
        if (this.column > 0 ) --this.column;

        this.proceedOn();
        // console.log(" Correnct  "+ this.answers.get(answer));
      }
    }
    else{
      this.finish();
    }
  }
  finish(){
    this.questionService.D = this.D;
    this.questionService.R = this.R;
    this.questionService.W = this.W;
    this.questionService.L = this.L;
    this.router.navigate([urlPaths.Question.result.url]);

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
    this.questions[j][i] = this.questionPaper.payload.doc.data().question1;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question2;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question3;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question4;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question5;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question6;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question7;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question8;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question9;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question10;
    i =-1; ++j;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question11;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question12;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question13;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question14;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question15;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question16;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question17;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question18;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question19;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question20;
    i =-1; ++j;

    this.questions[j][++i] = this.questionPaper.payload.doc.data().question21;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question22;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question23;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question24;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question25;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question26;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question27;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question28;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question29;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question30;
    i =-1; ++j;

    this.questions[j][++i] = this.questionPaper.payload.doc.data().question31;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question32;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question33;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question34;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question35;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question36;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question37;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question38;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question39;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question40;
    i =-1; ++j;

    this.questions[j][++i] = this.questionPaper.payload.doc.data().question41;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question42;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question43;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question44;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question45;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question46;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question47;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question48;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question49;
    this.questions[j][++i] = this.questionPaper.payload.doc.data().question50;
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

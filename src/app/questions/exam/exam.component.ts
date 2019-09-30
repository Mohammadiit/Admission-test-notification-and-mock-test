import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';
import {question} from '../../config/interfaces/question.interface';

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
  public questions: question[] = [];
  options = [];
  iterator = 4;
  selected = null;

  ngOnInit() {

    if(this.questionService.questionPaper != undefined) {
      this.questionPaper = this.questionService.questionPaper;
      this.loadProjects();
      this.questionShow();
      console.log( this.questions[this.iterator].statements);
    }
    else {

    }

  }


  private questionShow() {
    this.statement =  this.questions[this.iterator].statements;
    let i = 0;

    this.options[i] =  this.questions[this.iterator].a;
    this.options[++i] =  this.questions[this.iterator].b;
    this.options[++i] =  this.questions[this.iterator].c;
    this.options[++i] =  this.questions[this.iterator].d;

    this.questionAttempt.push(this.iterator);
  }

  next() {
    let answer =  this.questions[this.iterator].answer;
    console.log( "kkkkkkk  " + this.selected + "      " + answer);

    if( answer == this.selected){
        this.proceedOn();
    }
    else{
      this.easier();
    }

  }
  private easier() {
    while (1==1){
      if(this.questionAttempt.indexOf(--this.iterator) == -1) {
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
      if(this.questionAttempt.indexOf(++this.iterator) == -1) {
          this.questionShow();
          break;
      }
      if(this.iterator > 9) {
        break;
      }
    }
  }
  private loadProjects() {
    let i=0;
    this.questions[i] = this.questionPaper.payload.doc.data().question1;
    this.questions[++i] = this.questionPaper.payload.doc.data().question2;
    this.questions[++i] = this.questionPaper.payload.doc.data().question3;
    this.questions[++i] = this.questionPaper.payload.doc.data().question4;
    this.questions[++i] = this.questionPaper.payload.doc.data().question5;
    this.questions[++i] = this.questionPaper.payload.doc.data().question6;
    this.questions[++i] = this.questionPaper.payload.doc.data().question7;
    this.questions[++i] = this.questionPaper.payload.doc.data().question8;
    this.questions[++i] = this.questionPaper.payload.doc.data().question9;
    this.questions[++i] = this.questionPaper.payload.doc.data().question10;
  }


}

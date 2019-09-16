import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(public questionService: QuestionService,
              private router: Router) { }
  questionPaper;
  statement;
  a;
  b;
  c;
  d;
  selected = null;
  questions = ['question1','question2','question3','question4','question5','question6',
    'question7',
    'question8','question9','question10'];
  ngOnInit() {

    if(this.questionService.questionPaper != undefined) {
      this.questionPaper = this.questionService.questionPaper;
      this.questionShow();
      console.log(this.questionPaper.payload.doc.data().question1.statements);
    }
    else {

    }

  }

  private questionShow() {
    this.statement = this.questionPaper.payload.doc.data().question1.statements;
    this.a = this.questionPaper.payload.doc.data().question1.a;
    this.b = this.questionPaper.payload.doc.data().question1.b;
    this.c = this.questionPaper.payload.doc.data().question1.c;
    this.d = this.questionPaper.payload.doc.data().question1.d;

    console.log("iiiiiiiiiiiii  "+ this.selected);
  }



}

import { Component, OnInit } from '@angular/core';
import {urlPaths} from '../../config/constants/defaultConstants';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionPapers;

  constructor(public questionService: QuestionService,
              private router: Router) { }

  ngOnInit() {
    this.questionService.getAllQuestions() .subscribe(result => {
      this.questionPapers = result;
      console.log(this.questionPapers);

    });
  }
  press(questionPaper: any) {
    this.questionService.questionPaper = questionPaper;
    this.router.navigate([urlPaths.Question.exam.url]);
  }
}

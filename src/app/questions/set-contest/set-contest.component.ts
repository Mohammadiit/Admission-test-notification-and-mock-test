import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {QueryServiceService} from '../../shared/service/query-service.service';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-set-contest',
  templateUrl: './set-contest.component.html',
  styleUrls: ['./set-contest.component.scss']
})
export class SetContestComponent implements OnInit {
  contestForm: FormGroup;
  questionPapers = [];
  constructor(private fb: FormBuilder,
              public questionService: QuestionService,
              public af: AngularFirestore,
              private queryService:QueryServiceService,
              private router: Router) { }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  ngOnInit() {
    this.questionService.getAllQuestions() .subscribe(result => {
      this.questionPapers = result;
    });
    // this.questionService.demo();
    // let questions = [];
    // this.af.collection('question-paper')
    //   .get()
    //   .subscribe((snapshot) =>{
    //
    //     snapshot.forEach(doc => {
    //       console.log(doc.id);
    //       questions.push(doc);
    //       console.log(questions[0].id);
    //
    //     });
    //
    //   });

    //   console.log(res);
    // });
    this.makeContestForm();
  }
  makeContestForm() {
    this.contestForm = this.fb.group({
      startTime: [ '', [ Validators.required] ],
      duration: [ '', [ Validators.required ] ],
      question: [ '', [ Validators.required] ]
    });
  }

  onSubmit() {
    var d = new Date(this.contestForm.value.startTime);
    console.log(d);
    // this.contestForm.value.startTime = d;
    this.questionService.uploadContest(this.contestForm);
    this.router.navigate(['/questions/contest-list/'])
  }
}

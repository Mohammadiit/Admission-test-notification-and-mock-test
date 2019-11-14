import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionUploadComponent} from './question-upload/question-upload.component';
import {ExamComponent} from './exam/exam.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {ResultComponent} from './result/result.component';
import {SetContestComponent} from './set-contest/set-contest.component';
import {ContestListComponent} from './contest-list/contest-list.component';
import {ContestResultComponent} from './contest-result/contest-result.component';
import {ContestResultListComponent} from './contest-result-list/contest-result-list.component';
import {StudentGuard} from '../shared/service/security-service/student.guard';
import {ContestRegisteredGuard} from '../shared/service/security-service/contest-registered.guard';
import {PaymentStripeComponent} from './payment-stripe/payment-stripe.component';


const routes: Routes = [
  {
    path: 'upload',
    component: QuestionUploadComponent
  }, {
    path: 'exam/:id',
    component: ExamComponent,
    canActivate: [ ContestRegisteredGuard ]

  }, {
    path: 'list',
    component: QuestionListComponent,

  }, {
    path: 'result',
    component: ResultComponent
  }, {
    path: 'set-contest',
    component: SetContestComponent
  }, {
    path: 'contest-list',
    component: ContestListComponent
  }, {
    path: 'contest-result/:id',
    component: ContestResultComponent,

  }, {
    path: 'contest-result-list',
    component: ContestResultListComponent
  }, {
    path: 'payment-stripe/:id',
    component: PaymentStripeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }

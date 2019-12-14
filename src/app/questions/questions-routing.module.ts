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
import {AuthGuard} from '../shared/service/security-service/auth.guard';
import {AdminGuard} from '../shared/service/security-service/admin.guard';


const routes: Routes = [
  {
    path: 'upload',
    component: QuestionUploadComponent,
    canActivate: [AuthGuard, AdminGuard]


  }, {
    path: 'exam/:id',
    component: ExamComponent,
    canActivate: [AuthGuard, ContestRegisteredGuard, StudentGuard]


  }, {
    path: 'list',
    component: QuestionListComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'result/:id',
    component: ResultComponent,
    canActivate: [AuthGuard, StudentGuard]
  }, {
    path: 'set-contest',
    component: SetContestComponent,
    canActivate: [AuthGuard, AdminGuard]

  }, {
    path: 'contest-list',
    component: ContestListComponent,
    canActivate: [AuthGuard]


  }, {
    path: 'contest-result/:id',
    component: ContestResultComponent,
    canActivate: [AuthGuard, StudentGuard]
  }, {
    path: 'contest-result-list',
    component: ContestResultListComponent,
    canActivate: [AuthGuard, StudentGuard]
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

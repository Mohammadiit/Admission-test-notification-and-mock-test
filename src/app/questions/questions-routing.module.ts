import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionUploadComponent} from './question-upload/question-upload.component';
import {ExamComponent} from './exam/exam.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {ResultComponent} from './result/result.component';


const routes: Routes = [
  {
    path: 'upload',
    component: QuestionUploadComponent
  }, {
    path: 'exam',
    component: ExamComponent
  }, {
    path: 'list',
    component: QuestionListComponent
  }, {
    path: 'result',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }

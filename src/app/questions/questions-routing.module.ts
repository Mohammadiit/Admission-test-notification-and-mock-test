import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionUploadComponent} from './question-upload/question-upload.component';
import {ExamComponent} from './exam/exam.component';


const routes: Routes = [
  {
    path: 'upload',
    component: QuestionUploadComponent
  }, {
    path: 'exam',
    component: ExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }

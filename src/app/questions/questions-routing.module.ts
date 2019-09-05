import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionUploadComponent} from './question-upload/question-upload.component';


const routes: Routes = [
  {
    path: 'upload',
    component: QuestionUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }

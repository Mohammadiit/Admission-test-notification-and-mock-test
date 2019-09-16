import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionUploadComponent } from './question-upload/question-upload.component';

import readXlsxFile from 'read-excel-file';
import { ExamComponent } from './exam/exam.component'
import {SharedModule} from '../shared/shared.module';
@NgModule({
  declarations: [QuestionUploadComponent, ExamComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
  ]
})
export class QuestionsModule { }

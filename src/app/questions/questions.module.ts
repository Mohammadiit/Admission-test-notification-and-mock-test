import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionUploadComponent } from './question-upload/question-upload.component';

import readXlsxFile from 'read-excel-file'
@NgModule({
  declarations: [QuestionUploadComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionUploadComponent } from './question-upload/question-upload.component';

import readXlsxFile from 'read-excel-file';
import { ExamComponent } from './exam/exam.component'
import {SharedModule} from '../shared/shared.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { ResultComponent } from './result/result.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import {QuestionService} from './services/question.service';
@NgModule({
  declarations: [QuestionUploadComponent, ExamComponent, QuestionListComponent, ResultComponent, StudentProfileComponent, AddAdminComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
  ],
  providers: [ QuestionService ],

  entryComponents: [ QuestionUploadComponent ]
})
export class QuestionsModule { }

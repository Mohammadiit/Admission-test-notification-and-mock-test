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
import { SetContestComponent } from './set-contest/set-contest.component';
import { ContestListComponent } from './contest-list/contest-list.component';
@NgModule({
  declarations: [QuestionUploadComponent, ExamComponent, QuestionListComponent, ResultComponent, StudentProfileComponent, AddAdminComponent, SetContestComponent, ContestListComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
  ],
  providers: [ QuestionService ],

  entryComponents: [ QuestionUploadComponent ]
})
export class QuestionsModule { }

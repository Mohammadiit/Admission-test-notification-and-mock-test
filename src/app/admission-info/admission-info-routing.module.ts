import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdmissionInfoUploadComponent} from './components/admission-info-upload/admission-info-upload.component';
import {AdmissionInfoComponent} from './components/admission-info/admission-info.component';
import {AdmissionInfoListComponent} from './components/admission-info-list/admission-info-list.component';
import {AuthGuard} from '../shared/service/security-service/auth.guard';
import {AdminGuard} from '../shared/service/security-service/admin.guard';
import {PracticeComponent} from './components/practice/practice.component';


const routes: Routes = [
  {
    path: 'upload',
    component: AdmissionInfoUploadComponent,

  },
  {
    path: 'info/:id',
    component: AdmissionInfoComponent
  },
  {
    path: 'list',
    component: AdmissionInfoListComponent
  },
  {
    path: 'practice',
    component: PracticeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionInfoRoutingModule { }

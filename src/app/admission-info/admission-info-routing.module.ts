import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdmissionInfoUploadComponent} from './components/admission-info-upload/admission-info-upload.component';
import {AdmissionInfoComponent} from './components/admission-info/admission-info.component';
import {AdmissionInfoListComponent} from './components/admission-info-list/admission-info-list.component';


const routes: Routes = [
  {
    path: 'upload',
    component: AdmissionInfoUploadComponent
  },
  {
    path: 'info',
    component: AdmissionInfoComponent
  },
  {
    path: 'list',
    component: AdmissionInfoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionInfoRoutingModule { }

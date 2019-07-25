import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdmissionInfoUploadComponent} from './components/admission-info-upload/admission-info-upload.component';


const routes: Routes = [
  {
    path: 'upload',
    component: AdmissionInfoUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionInfoRoutingModule { }

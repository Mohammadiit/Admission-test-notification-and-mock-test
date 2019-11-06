import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionInfoRoutingModule } from './admission-info-routing.module';
import {SharedModule} from '../shared/shared.module';
import { AdmissionInfoUploadComponent } from './components/admission-info-upload/admission-info-upload.component';
import { AdmissionInfoComponent } from './components/admission-info/admission-info.component';
import { AdmissionInfoListComponent } from './components/admission-info-list/admission-info-list.component';
import { PracticeComponent } from './components/practice/practice.component';



@NgModule({
  declarations: [AdmissionInfoUploadComponent, AdmissionInfoComponent, AdmissionInfoListComponent, PracticeComponent],
  imports: [
    CommonModule,
    AdmissionInfoRoutingModule,
    SharedModule
  ]
})
export class AdmissionInfoModule { }

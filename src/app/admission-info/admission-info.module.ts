import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionInfoRoutingModule } from './admission-info-routing.module';
import {SharedModule} from '../shared/shared.module';
import { AdmissionInfoUploadComponent } from './components/admission-info-upload/admission-info-upload.component';



@NgModule({
  declarations: [AdmissionInfoUploadComponent],
  imports: [
    CommonModule,
    AdmissionInfoRoutingModule,
    SharedModule
  ]
})
export class AdmissionInfoModule { }

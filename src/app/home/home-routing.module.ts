import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdmissionInfoComponent} from '../admission-info/components/admission-info/admission-info.component';
import {AnonymousComponent} from './anonymous/anonymous.component';
import {SharedModule} from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: AnonymousComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

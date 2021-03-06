import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { AnonymousComponent } from './anonymous/anonymous.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [StudentComponent, AdminComponent, AnonymousComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
     SharedModule
  ]
})
export class HomeModule { }

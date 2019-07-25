import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components //

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

// Flex /////

import { FlexLayoutModule } from '@angular/flex-layout';

//   Material //
import {MatInputModule} from '@angular/material/input';


import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

// routing
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationRoutingModule} from './authentication-routing.module';


// firebase

import {AngularFirestoreModule} from '@angular/fire/firestore';

// form

import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// user defined service

import {AuthenticationService} from './services/authentication.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import {SharedModule} from '../shared/shared.module';
import {SnackbarComponent} from '../shared/components/snackbar/snackbar.component';

const appRoutes: Routes = [

  ];

@NgModule({
  declarations: [SignUpComponent, LogInComponent, AccountRecoveryComponent],
  imports: [
    CommonModule,
    MatInputModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    AngularFireAuthModule,
    SharedModule
  ],
  providers: [AuthenticationService],
  entryComponents:[ SnackbarComponent ]
})
export class AuthenticationModule { }

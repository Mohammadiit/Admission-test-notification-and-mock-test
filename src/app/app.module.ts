import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { environment } from '../environments/environment';

///     Authentication    //

import {AuthenticationModule} from './authentication/authentication.module';

//// material    /////

import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule
} from '@angular/material';

///  firebase     ////

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

/// form //
import {FormsModule} from '@angular/forms';

// flex //
import {FlexLayoutModule} from '@angular/flex-layout';
import { FileDropZoneDirective } from './shared/directives/File-drop-zone/FileDropZone.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BlankComponent } from './blank/blank.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

@NgModule({
  declarations: [
    AppComponent,
    FileDropZoneDirective,
    NavbarComponent,
    BlankComponent,
    PageNotFoundComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

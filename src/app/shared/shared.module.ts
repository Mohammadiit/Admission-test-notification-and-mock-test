import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatCardModule, MatFormFieldModule, MatInputModule,
  MatDividerModule, MatProgressBarModule, MatSnackBarModule, MatNativeDateModule, MatRadioModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SharedService} from './service/shared.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileUploadTaskComponent } from './components/file-upload-task/file-upload-task.component';


@NgModule({
  declarations: [SnackbarComponent, FileUploaderComponent, FileUploadTaskComponent],
  imports: [
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFileUploaderModule
  ],
  exports: [
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFileUploaderModule
  ],
  providers: [
    SharedService]
})
export class SharedModule { }

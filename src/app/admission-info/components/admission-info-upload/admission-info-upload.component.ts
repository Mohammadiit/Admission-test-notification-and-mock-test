import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {urlPaths} from '../../../config/constants/defaultConstants';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {AdmissionInfoService} from '../../services/admission-info.service';
import {UserInformation} from '../../../config/interfaces/user.interface';
import {AdmissionInformation} from '../../../config/interfaces/admission-info.interface';

@Component({
  selector: 'app-admission-info-upload',
  templateUrl: './admission-info-upload.component.html',
  styleUrls: ['./admission-info-upload.component.scss']
})

export class AdmissionInfoUploadComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private  admissionInfoService: AdmissionInfoService,
              ) { }
  admissionInfoData = this.admissionInfoService.admissionInfoForm;
  admissionInformation: AdmissionInformation;
  ngOnInit() {
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate([urlPaths.Authentication.Signin.url]);
  }

  onSubmit() {
    this.admissionInformation = {
      universityName: this.admissionInfoService.admissionInfoForm.un,
      unitName: ,
      applicationStarts: ,
      applicationEnds: ,
      seatPlanDeclaration: ,
      meritListDeclaration: ,
      examTime: ,
      officialNoticeLink: ,
      minimumCGPA: ,
      hscPassingYear: ,
      extraRequirements: ,
      totalFees: ,
      applicationLink: ,
      admitCardLink: 
    };
  }
}

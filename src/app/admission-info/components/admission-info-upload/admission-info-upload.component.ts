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
      universityName: this.admissionInfoData.value.universityName,
      unitName: this.admissionInfoData.value.unitName,
      applicationStarts: this.admissionInfoData.value.applicationStarts,
      applicationEnds: this.admissionInfoData.value.applicationEnds,

       examDate: this.admissionInfoData.value.examDate,



      officialNoticeLink: this.admissionInfoData.value.officialNoticeLink,
      minimumCGPA: this.admissionInfoData.value.minimumCGPA,


      hscPassingYear: this.admissionInfoData.value.hscPassingYear,
      sscPassingYear: this.admissionInfoData.value.sscPassingYear,


      totalFees: this.admissionInfoData.value.totalFees,
      admitCardLink: this.admissionInfoData.value.admitCardLink,


      seatPlanLink: this.admissionInfoData.value.seatPlanLink,
      meritListLink: this.admissionInfoData.value.meritListLink,
    };
    console.log(this.admissionInfoData.value);
    this.admissionInfoUpload(this.admissionInformation);
  }

  private admissionInfoUpload(admissionInformation: AdmissionInformation) {
    this.admissionInfoService.admissionInfoUpload(admissionInformation );
  }

  routeToAdmissionInfoList() {
   let  kk = JSON.stringify(this.admissionInfoData.value.applicationStarts);
    console.log(kk.substring(0,15));
    this.onSubmit();
    this.router.navigate([urlPaths.AdmissionInfo.AdmissionInfoList.url]);
  }
}

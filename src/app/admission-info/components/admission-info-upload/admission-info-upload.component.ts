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
      seatPlanDeclaration: this.admissionInfoData.value.seatPlanDeclaration,
      meritListDeclaration: this.admissionInfoData.value.meritListDeclaration,
      examTime: this.admissionInfoData.value.examTime,
      officialNoticeLink: this.admissionInfoData.value.officialNoticeLink,
      minimumCGPA: this.admissionInfoData.value.minimumCGPA,
      hscPassingYear: this.admissionInfoData.value.hscPassingYear,
      extraRequirements: this.admissionInfoData.value.extraRequirements,
      totalFees: this.admissionInfoData.value.totalFees,
      applicationLink: this.admissionInfoData.value.applicationLink,
      admitCardLink: this.admissionInfoData.value.admitCardLink
    };
    this.admissionInfoUpload(this.admissionInformation);
  }

  private admissionInfoUpload(admissionInformation: AdmissionInformation) {
    this.admissionInfoService.admissionInfoUpload(admissionInformation );
  }

  routeToAdmissionInfoList() {
    this.router.navigate([urlPaths.AdmissionInfo.AdmissionInfoList.url]);
  }
}

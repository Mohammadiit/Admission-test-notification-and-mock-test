import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AdmissionInformation} from '../../config/interfaces/admission-info.interface';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdmissionInfoService {
  item;
  constructor(private fb: FormBuilder
  , public af: AngularFirestore
  ) {
  }

  public admissionInfoForm = this.fb.group({
    universityName: ['', [ Validators.required]],
    unitName: ['', [ Validators.required]],
    applicationStarts: ['', [ Validators.required]],
    applicationEnds: ['', [ Validators.required]],
    examDate: ['', [ Validators.required]],
    totalFees: ['', [ Validators.required]],
    officialNoticeLink: ['', [ Validators.required]],
    minimumCGPA: ['', [ Validators.required]],
    hscPassingYear: ['', [ Validators.required]],
    sscPassingYear: ['', [ Validators.required]],
    admitCardLink: ['', [ Validators.required]],
    seatPlanLink: ['', [ Validators.required]],
    meritListLink: ['', [ Validators.required]]
  });

  admissionInfoUpload(admissionInformation: AdmissionInformation) {
    return this.af.collection('admission-info').add({
      universityName: admissionInformation.universityName,
      unitName: admissionInformation.unitName,
      applicationStarts: admissionInformation.applicationStarts,
      applicationEnds: admissionInformation.applicationEnds,

      examDate: admissionInformation.examDate,


      officialNoticeLink: admissionInformation.officialNoticeLink,
      minimumCGPA: admissionInformation.minimumCGPA,


      hscPassingYear: admissionInformation.hscPassingYear,
      sscPassingYear: admissionInformation.sscPassingYear,


      totalFees: admissionInformation.totalFees,
      admitCardLink: admissionInformation.admitCardLink,



      seatPlanLink: admissionInformation.seatPlanLink,
      meritListLink: admissionInformation.meritListLink,
    });
  }

  getAdmissionInfo(amissionInfo: string) {

     this.af.collection('admission-info').doc(amissionInfo).snapshotChanges();
  }
  getAllAdmissionInfo() {
    return this.af.collection('admission-info').snapshotChanges();
  }



}

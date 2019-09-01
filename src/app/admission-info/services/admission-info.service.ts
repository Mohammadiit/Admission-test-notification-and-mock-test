import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
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
  ,public af: AngularFirestore
  ) {
  }

  public admissionInfoForm = this.fb.group({
    universityName: [''],
    unitName: [''],
    applicationStarts: [''],
    applicationEnds: [''],
    seatPlanDeclaration: [''],
    meritListDeclaration: [''],
    examTime: [''],
    officialNoticeLink: [''],
    minimumCGPA: [''],
    hscPassingYear: [''],
    extraRequirements: [''],
    totalFees: [''],
    applicationLink: [''],
    admitCardLink: ['']
  });

  admissionInfoUpload(admissionInformation: AdmissionInformation) {
    return this.af.collection('admission-info').add({
      universityName: admissionInformation.universityName,
      unitName: admissionInformation.unitName,
      applicationStarts: admissionInformation.applicationStarts,
      applicationEnds: admissionInformation.applicationEnds,
      seatPlanDeclaration: admissionInformation.seatPlanDeclaration,
      meritListDeclaration: admissionInformation.meritListDeclaration,
      examTime: admissionInformation.examTime,
      officialNoticeLink: admissionInformation.officialNoticeLink,
      minimumCGPA: admissionInformation.minimumCGPA,
      hscPassingYear: admissionInformation.hscPassingYear,
      extraRequirements: admissionInformation.extraRequirements,
      totalFees: admissionInformation.totalFees,
      applicationLink: admissionInformation.applicationLink,
      admitCardLink: admissionInformation.admitCardLink
    });
  }

  getAdmissionInfo(amissionInfo: string) {

     this.af.collection('admission-info').doc(amissionInfo).snapshotChanges();
  }
  getAllAdmissionInfo() {
    return this.af.collection('admission-info').snapshotChanges();
  }



}

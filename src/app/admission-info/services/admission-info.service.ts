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
  , public af: AngularFirestore
  ) {
  }

  public admissionInfoForm = this.fb.group({
    universityName: [''],
    unitName: [''],
    applicationStarts: [''],
    applicationEnds: [''],
    examDate: [''],
    totalFees: [''],
    officialNoticeLink: [''],
    minimumCGPA: [''],
    hscPassingYear: [''],
    sscPassingYear: [''],
    admitCardLink: [''],
    seatPlanLink: [''],
    meritListLink: ['']
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

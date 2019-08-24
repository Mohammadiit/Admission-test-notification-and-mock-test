import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdmissionInfoService {

  constructor(private fb: FormBuilder) {
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

}

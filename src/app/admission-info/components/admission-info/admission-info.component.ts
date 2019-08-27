import { Component, OnInit } from '@angular/core';
import {AdmissionInfoService} from '../../services/admission-info.service';

@Component({
  selector: 'app-admission-info',
  templateUrl: './admission-info.component.html',
  styleUrls: ['./admission-info.component.scss']
})
export class AdmissionInfoComponent implements OnInit {

  constructor(private  admissionInfoService: AdmissionInfoService) { }

  ngOnInit() {
    this.admissionInfoService.getAdmissionInfo('0DHzBzvpegGqjlmh3XhU');

  }

}

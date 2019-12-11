import { Component, OnInit } from '@angular/core';
import {AdmissionInfoService} from '../../admission-info/services/admission-info.service';
import {QueryServiceService} from '../../shared/service/query-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss']
})
export class AnonymousComponent implements OnInit {

  constructor(private admissionInfoService: AdmissionInfoService
              , private queryService: QueryServiceService
    , private router: Router) { }
  list;
  ngOnInit() {
    this.admissionInfoService.getAllAdmissionInfo()
      .subscribe(result => {
        this.list = result;
      });
  }

  routeToAdmissionInfo(link) {
    this.router.navigate(['/admission-info/info' , link]);
  }
}

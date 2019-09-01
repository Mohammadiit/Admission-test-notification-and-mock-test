import { Component, OnInit } from '@angular/core';
import {AdmissionInfoService} from '../../services/admission-info.service';
import {first} from 'rxjs/operators';
import {QueryServiceService} from '../../../shared/service/query-service.service';
import {Router} from '@angular/router';
import {urlPaths} from '../../../config/constants/defaultConstants';

@Component({
  selector: 'app-admission-info-list',
  templateUrl: './admission-info-list.component.html',
  styleUrls: ['./admission-info-list.component.scss']
})
export class AdmissionInfoListComponent implements OnInit {

  constructor( private admissionInfoService: AdmissionInfoService
                ,private queryService: QueryServiceService
               , private router: Router
  ) { }
  items;
  ngOnInit() {
    this.admissionInfoService.getAllAdmissionInfo()
      .subscribe(result => {
        this.items = result;
      });
  }

  goToDetails(item: any) {
    this.admissionInfoService.item = item;
    this.router.navigate([urlPaths.AdmissionInfo.AdmissionInfo.url]);
  }
}

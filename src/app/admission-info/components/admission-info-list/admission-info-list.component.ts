import { Component, OnInit } from '@angular/core';
import {AdmissionInfoService} from '../../services/admission-info.service';
import {first} from 'rxjs/operators';
import {QueryServiceService} from '../../../shared/service/query-service.service';

@Component({
  selector: 'app-admission-info-list',
  templateUrl: './admission-info-list.component.html',
  styleUrls: ['./admission-info-list.component.scss']
})
export class AdmissionInfoListComponent implements OnInit {

  constructor( private admissionInfoService: AdmissionInfoService
  ,private queryService: QueryServiceService
  ) { }
  items;
  singleItem;
  ngOnInit() {
    this.admissionInfoService.getAllAdmissionInfo()
      .subscribe(result => {
        this.items = result;
      });
  }

  goToDetails(item: any) {
    this.queryService.getSingleData('admission-info', item.payload.doc.id)
      .pipe(first()).subscribe((res) => {
        this.singleItem = res;

    });
  }
}

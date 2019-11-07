import { Component, OnInit } from '@angular/core';
import {AdmissionInfoService} from '../../services/admission-info.service';
import {QueryServiceService} from '../../../shared/service/query-service.service';
import {first} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
  selector: 'app-admission-info',
  templateUrl: './admission-info.component.html',
  styleUrls: ['./admission-info.component.scss']
})
export class AdmissionInfoComponent implements OnInit {

  constructor(private  admissionInfoService: AdmissionInfoService,
              private queryService: QueryServiceService) { }
  singleItem;

  item = this.admissionInfoService.item;

  ngOnInit() {



    this.queryService.getSingleData('admission-info', this.item.payload.doc.id)
      .pipe(first()).subscribe((res) => {
      this.singleItem = res;

    });
  }



}


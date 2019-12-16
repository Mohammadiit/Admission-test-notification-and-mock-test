import { Component, OnInit } from '@angular/core';
import {AdmissionInfoService} from '../../services/admission-info.service';
import {QueryServiceService} from '../../../shared/service/query-service.service';
import {first} from 'rxjs/operators';
import {timer} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admission-info',
  templateUrl: './admission-info.component.html',
  styleUrls: ['./admission-info.component.scss']
})


export class AdmissionInfoComponent implements OnInit {
  url;
  constructor(private  admissionInfoService: AdmissionInfoService,
              private activatedRoute: ActivatedRoute,
              private queryService: QueryServiceService) {
    this.url = activatedRoute.snapshot.url[1].path;
    console.log(activatedRoute.snapshot.url[1].path);

  }
  singleItem;
  applicationStarts;
  applicationEnds;
  examDate;
  item = this.admissionInfoService.item;

  ngOnInit() {



    this.queryService.getSingleData('admission-info', this.url)
      .pipe(first()).subscribe((res) => {
      this.singleItem = res;
      this.applicationStarts = this.singleItem.applicationStarts.toDate() ;
      this.applicationEnds = this.singleItem.applicationEnds.toDate() ;
      this.examDate = this.singleItem.examDate.toDate() ;

    });
  }



}


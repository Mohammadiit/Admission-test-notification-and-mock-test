import {Component, OnInit, ViewChild} from '@angular/core';
import {AdmissionInfoService} from '../../services/admission-info.service';
import {first} from 'rxjs/operators';
import {QueryServiceService} from '../../../shared/service/query-service.service';
import {Router} from '@angular/router';
import {urlPaths} from '../../../config/constants/defaultConstants';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  universityName: string,
  unitName: string,
  applicationStarts : string,
  link : string,
}
@Component({
  selector: 'app-admission-info-list',
  templateUrl: './admission-info-list.component.html',
  styleUrls: ['./admission-info-list.component.scss']
})
export class AdmissionInfoListComponent implements OnInit {

  displayedColumns: string[] = [ 'universityName', 'unitName', 'applicationStarts'];
  data : PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private admissionInfoService: AdmissionInfoService
                ,private queryService: QueryServiceService
               , private router: Router
               , private http: HttpClient
  ) { }
  items;

  kk;
  ngOnInit() {
    let i=0;

    var obj = {};
    for(let i =0;i<5;++i){
      obj[i] = 'asd'
    }
    console.log(obj);
    this.admissionInfoService.getAllAdmissionInfo()
      .subscribe(result => {
        this.items = result;
        this.loadData();
        this.dataSource.paginator = this.paginator;

      });
  }
  private loadData() {
    for( let i=0;i< this.items.length; ++i) {
      let admissionInfo = this.items[i].payload.doc.data();
      this.data[i]={
        universityName : admissionInfo.universityName,
        unitName : admissionInfo.unitName,
        applicationStarts : admissionInfo.applicationStarts.toDate(),
        link : this.items[i].payload.doc.id
      }
    }
  }
  goToDetails(item: any) {
    this.admissionInfoService.item = item.link;

    let link = item.link ;
    this.router.navigate(['/admission-info/info' , link]);
    // this.router.navigate([urlPaths.AdmissionInfo.AdmissionInfo.url]);
  }


}

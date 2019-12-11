import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuestionService} from '../services/question.service';
import {QueryServiceService} from '../../shared/service/query-service.service';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  participantName : string,
  score : number
}

@Component({
  selector: 'app-contest-result',
  templateUrl: './contest-result.component.html',
  styleUrls: ['./contest-result.component.scss']
})
export class ContestResultComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [ 'participantName', 'score'];
  data : PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  contestId;
  result;
  tt=0;
  constructor(public questionService: QuestionService,
              private queryService: QueryServiceService,
              private router: Router) { }

  ngOnInit() {
    let url = this.router.url;
    this.contestId = url.substring(26,46);
    console.log(url, url.length  + '  '+url.substring(26,46));
    this.queryService.getSingleData('contests',this.contestId).subscribe(
      res =>{
        console.log(res);
        this.result = res;
        this.loadData();
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  private loadData() {
    // this.result = this.result.payload.doc.data();
    for( let i=0;i< this.result.marks.length; ++i) {
      let marks = this.result.marks[i];
      this.data[i]={
        participantName : marks.fullName,
        score : marks.score,

      }
    }
  }
}

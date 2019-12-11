import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {QuestionService} from '../services/question.service';
import {QueryServiceService} from '../../shared/service/query-service.service';
import {Router} from '@angular/router';
import * as moment from '../contest-list/contest-list.component';
export interface PeriodicElement {
  name: string,
  duration : string,
  startTime : string,
  status : boolean,
  contestLink: string
}
@Component({
  selector: 'app-contest-result-list',
  templateUrl: './contest-result-list.component.html',
  styleUrls: ['./contest-result-list.component.scss']
})
export class ContestResultListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'duration', 'startTime', 'Actions'];
  data : PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  interval;
  timeLeft;
  public contests;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public questionService: QuestionService,
              private queryService: QueryServiceService,
              private router: Router) { }

  ngOnInit() {


    this.questionService.getAllContest() .subscribe(result => {
      this.contests = result;

      this.loadData();
      this.dataSource.paginator = this.paginator;
      // this.check();
    });
  }

  private loadData() {
    let j=0;

    for (let i = 0; i < this.contests.length; ++i) {

      let contest = this.contests[i].payload.doc.data();
      console.log(contest);

      let previousContest = contest.startTime;
      ///     if contest time with duration over      ///
      // let contestTimeWithDuration = moment(contest.startTime).add(contest.duration, 'm').toDate();
      let d = new Date(contest.startTime);


      var diff = new Date(contest.startTime) - new Date();
      diff += contest.duration*60*10000;
      console.log('difffffffffff       '+diff+'    '+new Date(contest.startTime).toString().substring(0,24)
      +'   '+new Date(contest.startTime)
      );
      let status1;

      contest.startTime = new Date(contest.startTime).toString().substring(0,24);
      if (diff < 0) status1 = false;
      else status1 = true;
      ///     if contest time with duration over      ///

      // contest.startTime = moment(contest.startTime).format('MMMM Do YYYY, h:mm:ss a');

      if(!status1){
        this.data[j] = {
          name: "contests " + (i + 1),
          duration: contest.duration,
          startTime: contest.startTime,
          status: status1,
          contestLink: this.contests[i].payload.doc.id
        };
        ++j;
      }

    }
  }

  details(contestId: any) {
    this.router.navigate(['/questions/contest-result/', contestId]);
  }
}

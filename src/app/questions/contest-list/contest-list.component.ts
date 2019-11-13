import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';
import {QueryServiceService} from '../../shared/service/query-service.service';
import * as moment from 'moment';
import {SecurityService} from '../../shared/service/security-service/security.service';
import {register} from 'ts-node';
import {Observable} from 'rxjs';

export interface PeriodicElement {
  name: string,
  duration : string,
  startTime : string,
  status : boolean,
  questionLink : string,
  contestLink : string,
  register : boolean
}

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'duration', 'startTime', 'Actions'];
  data : PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>();
  interval;
  timeLeft;
  public contests;
  public array = [];
  public register = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public questionService: QuestionService,
              private queryService: QueryServiceService,
              private securityService: SecurityService,
              private router: Router) { }

  ngOnInit() {
    //     Stop watch //

    // console.log('kkkkkkkkkkkkk       forrrrrrrrrrr' + moment().startOf('day')
    //   .seconds(154)
    //   .format('H:mm:ss'));

    ///////////////

    // let a = new Date( Date.parse("2011/11/10 11:11:11") );
    // let b = new Date (Date.parse("2011/10/10 11:11:11") );
    // let b1 = Math.abs(a-b);
    // b1 = Math.floor((b1/1000)/60);
    // var newDateObj = moment(b).add(30, 'm').toDate();
    // console.log(b);
    // console.log(newDateObj);
    // let formatDate = moment(b).format('MMMM Do YYYY, h:mm:ss a');
    this.questionService.getAllContest() .subscribe(result => {
      this.contests = result;









      this.loadData();
      this.dataSource.paginator = this.paginator;
      this.check();
      this.loadRegisterArray().subscribe(res=>{
        console.log(this.register);
        for(let j=0;j<this.array.length;++j){
          this.data[j].register = this.register [this.array[j]];
        }
      });
    });
  }

  loadRegisterArray(): Observable<any> {
    return new Observable((observer) => {
      let i=0;
        for( i=0;i<this.contests.length;++i){
          this.securityService.isRegisteredInContest(this.contests[i].payload.doc.id).subscribe(res =>{
            if(res){
              this.register.push(true);
            }
            else  this.register.push(false);

          });
        }
       observer.next();
    });
  }

  private check() {

    this.interval = setInterval(() => {
      let now = new Date();
      let j=0;
      for( let i=0;i< this.contests.length; ++i) {
        let contest = this.contests[i].payload.doc.data();

        var contestTimeWithDuration = moment(contest.startTime).add(contest.duration, 'm').toDate();
        var diff = contestTimeWithDuration - new Date();
        let status;

        if (diff > 0) status = true;
        else status = false;

        if(status) {
          this.array.push(i);
          let b1 = new Date(contest.startTime) - now  ;
          b1 = Math.floor((b1/1000)/60);
          if(b1 < 0){
            this.data[j].status = false;
          }
          else {
            this.data[j].status = true;
          }
          ++j;
        }
      }
    },1000);
  }
  private loadData() {
    let j=0;

      for (let i = 0; i < this.contests.length; ++i) {
        let contest = this.contests[i].payload.doc.data();
        console.log(contest);
        let previousContest = contest.startTime;
        ///     if contest time with duration over      ///
        let contestTimeWithDuration = moment(contest.startTime).add(contest.duration, 'm').toDate();
        var diff = contestTimeWithDuration - new Date();
        let status;

        if (diff > 0) status = true;
        else status = false;
        ///     if contest time with duration over      ///

        contest.startTime = moment(contest.startTime).format('MMMM Do YYYY, h:mm:ss a');

        if (status) {
          let isRegistered = false;


          this.data[j] = {
            name: "contests " + (i + 1),
            duration: contest.duration,
            startTime: contest.startTime,
            status: true,
            questionLink: contest.questionId,
            contestLink: this.contests[i].payload.doc.id,
            register: false,
          };
          ++j;
        }
      }
      this.dataSource.data = this.data;
  }


  exam(questionLink: any, contestLink:any) {
    questionLink = questionLink  +'contest' + contestLink;
    this.router.navigate(['/questions/exam/' , questionLink]);
  }
}

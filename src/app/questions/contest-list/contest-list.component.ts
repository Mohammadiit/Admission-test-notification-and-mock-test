import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';

export interface PeriodicElement {
  name: string,

  duration : string,
  startTime : string,
}

@Component({
  selector: 'app-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'duration', 'startTime', 'Actions'];
  data : PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);

  public contests;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public questionService: QuestionService,
              private router: Router) { }

  ngOnInit() {

    this.questionService.getAllQuestions() .subscribe(result => {
      this.contests = result;
      console.log(this.contests);
      this.loadData();
      this.dataSource.paginator = this.paginator;
    });
  }

  private loadData() {
    let j=0;
    for( let i=0;i< this.contests.length; ++i) {
      if(this.contests[i].status){
        this.data[j]={
          name : "contests " + (i+1),
          duration : this.contests[i].duration,
          startTime : this.contests[i].startTime
        };
        ++j;
      }

    }
  }
}

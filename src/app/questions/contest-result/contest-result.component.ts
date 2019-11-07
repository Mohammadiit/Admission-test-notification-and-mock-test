import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../services/question.service';
import {QueryServiceService} from '../../shared/service/query-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contest-result',
  templateUrl: './contest-result.component.html',
  styleUrls: ['./contest-result.component.scss']
})
export class ContestResultComponent implements OnInit {

  contestId;
  result;
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
      }
    )
  }

}

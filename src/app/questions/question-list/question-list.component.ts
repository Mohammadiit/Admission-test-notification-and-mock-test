import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {urlPaths} from '../../config/constants/defaultConstants';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SharedService} from '../../shared/service/shared.service';
import {SecurityService} from '../../shared/service/security-service/security.service';



export interface PeriodicElement {
  name: string,
  NumberOfQuestions: number,
  link : number
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {


  displayedColumns: string[] = [ 'name', 'NumberOfQuestions'];
  data : PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
//////////////////////////////////////////////////////
  isAdmin



  public questionPapers;



  constructor(public questionService: QuestionService,
              private securityService: SecurityService,
              private router: Router) { }

  ngOnInit() {
    this.securityService.isAdmin().subscribe(res=>{
      this.isAdmin = res;
    })
    // window.addEventListener("beforeunload", function (e) {
    //   var confirmationMessage = "\o/";
    //   console.log("cond");
    //   e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    //   return confirmationMessage;              // Gecko, WebKit, Chrome <34
    // });

    console.log('    j;je;rw   ' + this.router.url);
    this.questionService.getAllQuestions() .subscribe(result => {
      this.questionPapers = result;
      console.log(this.questionPapers[0].payload.doc.id);
      this.loadData();
      this.dataSource.paginator = this.paginator;
    });


  }

  private loadData() {

    for( let i=0;i< this.questionPapers.length; ++i) {
      let question = this.questionPapers[i].payload.doc.data();
      this.data[i]={
        name : "Question " + (i+1),
      NumberOfQuestions : question.numberOfQuestions,
          link : this.questionPapers[i].payload.doc.id
      }

    }
  }

  press(row: any) {
    this.questionService.questionPaper = this.questionPapers[row.link];
    let link = row.link + 'exammmm';
    if(!this.isAdmin){
      this.router.navigate(['/questions/exam/' , link]);
    }
  }


  openQuestionUploadModal() {
    this.questionService.openQuestionModal();
  }
}

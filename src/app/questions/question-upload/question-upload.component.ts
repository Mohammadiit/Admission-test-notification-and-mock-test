import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {question} from '../../config/interfaces/question.interface';
import {QuestionService} from '../services/question.service';
import {urlPaths} from '../../config/constants/defaultConstants';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-question-upload',
  templateUrl: './question-upload.component.html',
  styleUrls: ['./question-upload.component.scss']
})
export class QuestionUploadComponent implements OnInit {
  private file: File;
  public  data: string [][];
  public questions: question[] = [];
  public questionPapers;
  private event;
  private fileUploadForm: FormGroup;
  private fileForm: FormGroup;
  private process: boolean =false;
  constructor(public questionService: QuestionService,
              private fb: FormBuilder,
              private router: Router) {

  }


  
  ngOnInit() {
    this.makeFileUploadForm();

  }
  makeFileUploadForm() {
    this.fileUploadForm = this.fb.group({
      questionSize: [ '', [ Validators.required] ],
      numberOfQuestion: [ '', [ Validators.required ] ],

    });
    this.fileForm = this.fb.group({
      file: [ '', [ Validators.required ] ],

    });
  }

  onFileChange(evt: any) {
    this.event = evt;
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      let j=0;
      for(let i=0;i<(this.fileUploadForm.value.questionSize + 1); ++i) {
        j=0;
        var statements1, a1,b1,c1,d1,discrimination1,difficulties1,psuedoguessing1,answer1;
        statements1 = this.data [i][j];
        ++j;
        a1 = this.data [i][j];
        ++j;
        b1 = this.data [i][j];
        ++j;
        c1 = this.data [i][j];
        ++j;
        d1 = this.data [i][j];
        ++j;
        discrimination1 = this.data [i][j];
        ++j;
        difficulties1 = this.data [i][j];
        ++j;
        psuedoguessing1 = this.data [i][j];
        ++j;
        answer1 = this.data [i][j];
        ++j;
        if(i != 0){
          var question: question = {
            statements: statements1,
            a: a1,
            b: b1,
            c: c1,
            d: d1,
            discrimination: discrimination1,
            difficulties: difficulties1,
            answer: answer1,
          };
          console.log(question);
          this.questions = [ ...this.questions , question];
        }

      }


    };

    //  1st file ta parse krte call kre. tarpor reader.onload() call hoy

    reader.readAsBinaryString(this.event.target.files[0]);
  }



  private fileRead() {

  }

  questionUpload() {
    this.questionService.uploadQuestion(this.questions, this.fileUploadForm);
    this.questionService.close();
    this.router.navigate(['/questions/list']);
  }

  onSubmit() {
    this.process = true;

    // this.fileRead();
    // this.questionUpload();
    // this.router.navigate(['/questions/list']);
  }

  onFileSelected(evt: any) {
    console.log(evt +"        "+"eeeeeeeeevvvvvvtttttttt");
    debugger;
  }


  upload() {
    this.questionUpload();
  }
}

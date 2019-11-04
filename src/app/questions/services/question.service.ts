import { Injectable } from '@angular/core';
import {question} from '../../config/interfaces/question.interface';
import {AngularFirestore} from '@angular/fire/firestore';
import {QuestionUploadComponent} from '../question-upload/question-upload.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public questionPaper;
  L=0;
  W=0;
  D=0;
  R=0;
  constructor(public af: AngularFirestore,public dialog: MatDialog) { }

  uploadQuestion(questions: question[]) {
    return this.af.collection('question-paper').add({

      question1: questions[0],
      question2: questions[1],
      question3: questions[2],
      question4: questions[3],
      question5: questions[4],
      question6: questions[5],
      question7: questions[6],
      question8: questions[7],
      question9: questions[8],
      question10: questions[9],
      question11: questions[10],
      question12: questions[11],
      question13: questions[12],
      question14: questions[13],
      question15: questions[4],
      question16: questions[15],
      question17: questions[16],
      question18: questions[17],
      question19: questions[18],
      question20: questions[19],
      question21: questions[20],
      question22: questions[21],
      question23: questions[22],
      question24: questions[23],
      question25: questions[24],
      question26: questions[25],
      question27: questions[26],
      question28: questions[27],
      question29: questions[28],
      question30: questions[29],
      question31: questions[30],
      question32: questions[31],
      question33: questions[32],
      question34: questions[33],
      question35: questions[34],
      question36: questions[35],
      question37: questions[36],
      question38: questions[37],
      question39: questions[38],
      question40: questions[39],
      question41: questions[40],
      question42: questions[41],
      question43: questions[42],
      question44: questions[43],
      question45: questions[44],
      question46: questions[45],
      question47: questions[46],
      question48: questions[47],
      question49: questions[48],
      question50: questions[49],
    });
  }

  getAllQuestions() {

    return this.af.collection('question-paper').snapshotChanges();
  }

    openQuestionModal(width?: string){
      const dialogRef = this.dialog.open(QuestionUploadComponent, {
        minWidth:'450px',
        width: width ? width : '35vw'
        // height:'60vh'
      });
    }
    close(){
      this.dialog.closeAll();
    }
}

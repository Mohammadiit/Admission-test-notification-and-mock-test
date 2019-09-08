import { Injectable } from '@angular/core';
import {question} from '../../config/interfaces/question.interface';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public af: AngularFirestore) { }

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
    });
  }
}

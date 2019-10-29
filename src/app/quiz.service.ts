import { Injectable } from '@angular/core';

export interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
}


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizzes(): QuizDisplay[] {
    return [
      { name: 'Quiz 1', numberOfQuestions: 3 }
      , { name: 'Quiz 2', numberOfQuestions: 0 }
      , { name: 'Quiz 3', numberOfQuestions: 30 }
    ];
  }
}

import { Injectable } from '@angular/core';

export interface QuizDisplay {
  name: string;
  questionCount: number;
}

@Injectable({
  providedIn: 'root'
})

export class QuizService {

  constructor() { }

  loadQuizzes(): QuizDisplay[] {

    return [
      { name: "Quiz 1", questionCount: 10 }
      , { name: "Quiz 2", questionCount: 0 }
      , { name: "Quiz 3", questionCount: 25 }
    ];
  }
}

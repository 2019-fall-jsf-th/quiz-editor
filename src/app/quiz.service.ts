import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizzes() {
    return [
      "Quiz 1"
      , "Quiz 2"
      , "Quiz 3"
      , "Quiz 4"

    ];
  }
}

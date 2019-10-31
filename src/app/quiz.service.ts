import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
}


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }

  loadQuizzes() {

    return this.builtInAngularHttpClient.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz');

    // Dummy, stub, mock quizzes
    // return [
    //   { name: 'Quiz 1', numberOfQuestions: 3 }
    //   , { name: 'Quiz 2', numberOfQuestions: 0 }
    //   , { name: 'Quiz 3', numberOfQuestions: 30 }
    // ];
  }
}

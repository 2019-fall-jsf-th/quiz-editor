import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }

  loadQuizzes() {

    return this.builtInAngularHttpClient.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Tom%20Steele');

    // return [
    //   { name: "Quiz 1", questionCount: 10 }
    //   , { name: "Quiz 2", questionCount: 0 }
    //   , { name: "Quiz 3", questionCount: 25 }
    // ];
  }
}

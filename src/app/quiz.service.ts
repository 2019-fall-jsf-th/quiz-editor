import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { QuizDisplay } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpSvc: HttpClient) { }

  loadQuizzes(): Observable<Object> {

    let svcUrl = 'https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Anonymous%20Coward';
    return this.httpSvc.get(svcUrl);

    // dummy dev data
    // return [
    //   { name: "Quiz 1", questionCount: 1 }
    //   , { name: "Quiz 2", questionCount: 0 }
    //   , { name: "Quiz 3", questionCount: 25 }
    // ];
  }

  getMagicNumberPromise(makeThisPromiseSucceed: boolean): Promise<number> {
    let p = new Promise<number>(
      (resolve, reject) => {
        makeThisPromiseSucceed ? resolve(42) : reject("Failed");
      }
    );

    return p;
  }
}

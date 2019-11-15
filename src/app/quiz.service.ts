import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }

  // returns an observable of type object?
  loadQuizzes() {
    return this.builtInAngularHttpClient.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Linda%20Xiong');

    // return [
    //   { name: "Quiz 1", questionCount: 10 }
    //   , { name: "Quiz 2", questionCount: 0 }
    //   , { name: "Quiz 3", questionCount: 25 }
    // ];
  }

  // pass true if you want it to succeed, pass fail if you want it to fail
  getMagicNumberPromise(makeThisPromiseSucceed: boolean): Promise<number> {
    let p = new Promise<number>(
      (resolve, reject) => makeThisPromiseSucceed ? resolve(42) : reject("Failed!")
    );
    
    return p;
  }
}

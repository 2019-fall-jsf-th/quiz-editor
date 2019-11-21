import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

// an interface is just a ? of data, shapes data?
// removed temporaryQuestionCount, and added a questions array
interface QuizDisplay {
  name: string;
  questions: DisplayedQuestion[];
  markedForDelete: boolean;
}

interface DisplayedQuestion {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  //propName = 'Purple';
  private random = Math.random();
  propName = this.random > 0.5 ? 'Green' : 'Yellow';
  borderRadius = this.random > 0.5 ? '30px' : '0px';

  toolTipText = `The color is ${this.propName} ${this.random}`;

  someHtmlString = '<h1>Linda Xiong</h1>';

  // Set type of array - type annotation instead of type inference
  quizzes: QuizDisplay[] = [];

  // In TS, constructors are used for dependency injections only, parameters can take scope specifiers
  constructor(private qSvc: QuizService) {}

  failedToLoadQuizzes = false;
  
  // Refractor to use ngOnInit() rather than using constructor to load our quizzes
  ngOnInit() {
    //this.quizzes = [];

    this.qSvc
      .loadQuizzes()
      // make a call to a webservice
      .subscribe( 
        data => {
          console.log(data);
          console.log('woohoo');
          this.quizzes = (<any[]> data).map(x => ({
            name: x.name
            , questions: x.questions
            , markedForDelete: false
          }));
        }
        , error => {
          console.error(error.error);
          this.failedToLoadQuizzes = true;
        }
          
      )
    console.log(this.quizzes);
  }

  selectedQuiz = undefined;

  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
  }

  // changed questions to an empty array b/c new quizzes will have no questions
  addNewQuiz() {
    const newQuiz = { 
      name: 'Untitled Quiz'
      , questions: []
      , markedForDelete: false
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];
  }

  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , { name: "New question"}
    ];
  }

  // use filter - b/c you want items in resulting array to match criteria set
  removeQuestion(question) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== question);
  }


  // Promises - nesting of promises
  // .then returns new promises - set up so you can chain them?
  jsPromisesOne() {
    const x = this.qSvc.getMagicNumberPromise(true);
    console.log(x); // ??? -> will return ZoneAwarePromise

    // Kevin asked about this - presumes what async await does?
    let z = x.then();
    console.log(z);

    x.then(
      n => {
        console.log(n);

        const y = this.qSvc.getMagicNumberPromise(false);
        console.log(y); // ???

        y.then(n => console.log(n)).catch(err => console.error(err));
      }
    )
    .catch(err => console.error(err))
  }

  // ways to get out of .then .catch hell
  // the await is taking the .then nonsense and making it work
  // use try catch block to catch errors
  async jsPromisesTwo() {
    try {
      const x = await this.qSvc.getMagicNumberPromise(true);
      console.log(x); // ??? will get 42 if true, uncaught error if false if not in try/catch block
  
      const y = await this.qSvc.getMagicNumberPromise(false);
      console.log(y); // ??? will get 42 if true, will get error message if false
    }

    catch(err) {
      console.error(err);
    }
    
  }

  // if no await, get ZoneAwarePromise
  async jsPromisesThree() {
    try {
      const x = this.qSvc.getMagicNumberPromise(true);
      console.log(x); // ??? will get 42 if true, uncaught error if false if not in try/catch block
  
      const y = this.qSvc.getMagicNumberPromise(true);
      console.log(y); // ??? will get 42 if true, will get error message if false

      // make 2 calls, then await until all the calls are finished
      const results = await Promise.all([x, y]);
      console.log(results); // ??? come back as an array with 2 numbers, if one fails, then we get a console.error and no results

      // get the first one that finishes and display it
      // const results1 = await Promise.race([x, y]);
      // console.log(results1); // ??? 
    }

    catch(err) {
      console.error(err);
    }
    
  }
  
}

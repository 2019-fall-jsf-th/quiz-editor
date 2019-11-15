import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

// an interface is just a ? of data
// removed temporaryQuestionCount, and added a questions array
interface QuizDisplay {
  name: string;
  questions: DisplayedQuestion[];
}

interface DisplayedQuestion {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
      , questions: []};

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
  jsPromisesOne() {
    const x = this.qSvc.getMagicNumberPromise(false);
    console.log(x); // ??? -> will return ZoneAwarePromise

    x.then(
      n => {
        console.log(n);

        const y = this.qSvc.getMagicNumberPromise(true);
        console.log(y); // ???

        y.then(n => console.log(n));
      }
    )

    .catch(err => console.error(err))
  }
}

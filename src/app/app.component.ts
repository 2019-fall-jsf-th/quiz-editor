import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { ConsoleReporter } from 'jasmine';

interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
}

interface QuestionDisplay {
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

  someHtmlString = '<h1>Tom Steele</h1>';

  quizzes: QuizDisplay[] = [];

  constructor(private qSvc: QuizService) {}

  failedToLoadQuizzes = false;

  ngOnInit() {
    
    //this.quizzes = [];
    
    this.qSvc
      .loadQuizzes()
      .subscribe(
        data => {
          console.log(data);
          console.log('woo hoo');
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

  addNewQuiz() {

    const newQuiz = { 
      name: 'Untitled Quiz'
      , questions: []
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectQuiz(newQuiz);
  }

  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , { name: "New Question" }
    ];
  }

  removeQuestion(question) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== question);
  }

  jsPromisesOne() {
    //using a true parameter for the getMagicNumberPromise method it will go into the .then and run that code
    //const x = this.qSvc.getMagicNumberPromise(true)
    //if using a false parameter for the getMagicNumberPromise method it will not go into the .then and you must use a .catch
    const x = this.qSvc.getMagicNumberPromise(false);
    console.log(x);
    x.then(
      n => {
        console.log(n);

        const y = this.qSvc.getMagicNumberPromise(true);
        console.log(y);

        y.then(n => console.log(n));
      }
    ) 
    .catch(error => console.error(error))
  }
}

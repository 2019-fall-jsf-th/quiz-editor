import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { async } from 'q';

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
    const x = this.qSvc.getMagicNumberPromise(true);
    console.log(x);

    x.then(
      n => {
        console.log(n);

        const y = this.qSvc.getMagicNumberPromise(false);
        console.log(y);

        y.then( n => { console.log(n); } )
        .catch(err => console.error(err))
      }
    )
    .catch(err => console.error(err))

  }
  
  async jsPromisesTwo() {

    try {
      const x = await this.qSvc.getMagicNumberPromise(true);
      console.log(x);
  
      const y = await this.qSvc.getMagicNumberPromise(false);
      console.log(y);
    }
    catch(err) {
      console.error(err);
    }

  }
}

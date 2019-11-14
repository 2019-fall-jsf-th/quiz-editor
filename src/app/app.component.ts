import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  temporaryQuestionCount: number;
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
            , temporaryQuestionCount: x.questions.length
            , quizQuestions: x.questions
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
    console.log(this.selectedQuiz.quizQuestions);
  }

  addNewQuestion() {
    console.log('hey this works');

    const newQuestion = {name: ''};

    this.selectedQuiz.quizQuestions = [
      ...this.selectedQuiz.quizQuestions
      , newQuestion
    ];

    this.selectedQuiz.temporaryQuestionCount += 1;

  }

  addNewQuiz() {

    const newQuiz = { 
      name: 'Untitled Quiz'
      , temporaryQuestionCount: 0
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectQuiz(newQuiz);
  }
}

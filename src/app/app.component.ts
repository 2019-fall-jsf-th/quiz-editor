import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  questionCount: number;
  questions: string[];
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';
/*
  //propName = 'Purple';
  private random = Math.random();
  propName = this.random > 0.5 ? 'Green' : 'Yellow';
  borderRadius = this.random > 0.5 ? '30px' : '0px';

  toolTipText = `The color is ${this.propName} ${this.random}`;

  someHtmlString = '<h1>Tom Steele</h1>';
*/
  quizzes: QuizDisplay[] = [];

  constructor(private qSvc: QuizService) {}

  failedToLoadQuizzes = false;

  ngOnInit() {
    this.quizzes = [];
    this.qSvc
      .loadQuizzes()
      .subscribe(
        data => {
          console.log(data)
          this.quizzes = (<QuizDisplay[]> data).map(
              x => ({
                name: x.name
                , questionCount: x.questions.length
                , questions: x.questions
              })
          );
        }
        , error => {
          console.error(error.error);
          this.failedToLoadQuizzes = true;
        })
      // .map(x => ({
      //   name: x.name
      //   , tempQuestionCount: x.questionCount
      // }));
    console.log(this.quizzes);
  }


  selectedQuiz = undefined;

  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
  }

  addNewQuiz() {
    let newQuiz = {'name': 'Untitled', 'questionCount': 0, 'questions':[]};

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectQuiz(newQuiz);
    console.table('addNewQuiz', this.selectedQuiz);
  }

  // updateQuiz(name='', questionCount=0) {
  //   this.selectedQuiz.name = name;
  //   this.selectedQuiz.questionCount = questionCount;
  // }
}

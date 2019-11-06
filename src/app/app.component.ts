import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService, QuizDisplay } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  myBackgroundColorProperty = "purple";
  quizzes: QuizDisplay[] = [];
  errorLoadingQuizzes = false;

  ngOnInit() {
    this.myBackgroundColorProperty = Math.random() > 0.5 ? 'yellow' : 'green';
    this.qSvc
      .loadQuizzes()
      .subscribe(
        data => {
            console.log(data);
            this.quizzes = (<any> data).map(x => ({
              name: x.name
              , numberOfQuestions: x.numberQuestions
            }));
        }
        , error => this.errorLoadingQuizzes = true
      );
  }

  ngOnDestroy() {
    console.log('here');
  }

  get titleTooltip() {
    return `The background color is ${this.myBackgroundColorProperty}`;
  }

  constructor(private qSvc: QuizService) {
  }

  selectedQuiz: QuizDisplay = undefined;

  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
  }
}

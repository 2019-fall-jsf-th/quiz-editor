import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  // propName = 'Purple';
  propName = Math.random() > 0.5 ? 'Green' : 'Yellow';
  borderRadius = Math.random() > 0.5 ? '30px' : '0px';

  bindingTitle = `The color is ${this.propName}`;

  someHtmlString = 'Joe Sweeney';

  quizzes = [];
  constructor(private qSvc: QuizService) {
    this.quizzes = qSvc.loadQuizzes();
    console.log(this.quizzes);
  }

  selectedQuiz = undefined;

  selectQuiz (q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz);
  }
}

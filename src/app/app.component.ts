import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  private random = Math.random();
  propName = this.random > 0.5 ? 'Green' : 'yellow';
  borderRadius = this.random > 0.5? '30px' : '0px';
  toolTipText = `The color is ${this.propName} ${this.random}`;
  someHtmlString = '<h1>Billy</h1>'

  quizzes = [];

  constructor(private qSvc: QuizService){
    this.quizzes = qSvc.loadQuizzes();
    console.log(this.quizzes);
  }

  selectedQuiz = undefined;
  
  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
  }

  addNewQuiz() {

    const newQuiz = {name: 'untitled quiz', questionCount: 0};
    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectQuiz(newQuiz);
  }
}

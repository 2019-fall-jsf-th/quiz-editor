import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  myBackgroundColorProperty = "purple";
  quizzes = [];
  
  ngOnInit() {
    this.myBackgroundColorProperty = Math.random() > 0.5 ? 'yellow' : 'green';
    this.quizzes = this.qSvc.loadQuizzes();
  }

  get titleTooltip() {
    return `The background color is ${this.myBackgroundColorProperty}`;
  }

  constructor(private qSvc: QuizService) {

  }
}

import { Component } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  //propName = 'Purple';
  private random = Math.random();
  propName = this.random > 0.5 ? 'Green' : 'Yellow';
  borderRadius = this.random > 0.5 ? '30px' : '0px';

  toolTipText = `The color is ${this.propName} ${this.random}`;

  someHtmlString = '<h1>Tom Steele</h1>';

  quizzes = [];

  constructor(private qSvc: QuizService) {
    this.quizzes = this.qSvc.loadQuizzes();
    console.log(this.quizzes);
  }

  selectedQuiz = undefined;

  selectQuiz(q) {
    this.selectedQuiz = q;
    //console.log(this.selectedQuiz.name);
  }

  changeQuizName(changedQuizName: String) {
    let quizzesList = [...this.quizzes];
    // console.log(quizzesList);
    
   quizzesList.forEach(quiz => {
      if (quiz.name == this.selectedQuiz.name) {
        quiz.name = changedQuizName;
      }
   });
    // console.log(quizzesList);
    
  }

  addQuiz() {
    let newQuiz = {name: "Untitled Quiz", questionCount: 0};
    this.quizzes.push(newQuiz);
  }


}

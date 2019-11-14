import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
    name: string;
    questionCount: number;
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

  selectedQuiz = undefined;

  failedToLoadQuizzes = false;
  ngOnInit() {
    //this.quizzes = []; 
    
    this.qSvc
      .loadQuizzes()
      .subscribe(
        data => {
          
          console.log(data);
          console.log('Woo Hoo');
          this.quizzes = (<any[]>data).map(x => ({
            name: x.name
            , questionCount: x.questions.length
          }));
        }
        , error => {
          console.error(error.error);
          this.failedToLoadQuizzes = true;
        }
      );
   
    console.log(this.quizzes);
  }
  

  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
  }

  addNewQuiz() {
    const newQuiz = { 
      name: 'Untitled Quiz'
      , questionCount: 0 }

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectedQuiz(newQuiz);
  }

  addNewQuestion() {
    const newQuestion = {
      name: 'Question'
      , 
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';


interface QuizDisplay {
  name: string;
  questions: DisplayedQuestion[];
}

interface DisplayedQuestion {
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

  someHtmlString = '<h1>Linda Xiong</h1>';

  // Set type of array - type annotation instead of type inference
  quizzes: QuizDisplay[] = [];

  // In TS, constructors are used for dependency injections only, parameters can take scope specifiers
  constructor(private qSvc: QuizService) {}

  failedToLoadQuizzes = false;
  
  // Refractor to use ngOnInit() rather than using constructor to load our quizzes
  ngOnInit() {
    //this.quizzes = [];

    this.qSvc
      .loadQuizzes()
      // make a call to a webservice
      .subscribe( 
        data => {
          console.log(data);
          console.log('woohoo');
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
      , questions: []};

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];
  }

  addNewQuestion() {
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, { name: "New question"}];
  }
}

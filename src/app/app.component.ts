import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
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
    console.log(this.selectedQuiz);
    console.log(this.selectedQuiz.name);
    // selected a specific question but directing towards a spot in the questions array and grabbing the value of that spot's name
    console.log(this.selectedQuiz.questions[0].name);
    console.log("questions: ");
    for(let i=0;i<this.selectedQuiz.questions.length;i++) {
      console.log(this.selectedQuiz.questions[i].name);
    }
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
    // Make sure code is directed towards the currently selected quiz
    this.selectedQuiz.questions = [
      // Spread into the quizzes questions the current questions as well as...
      ...this.selectedQuiz.questions
      // ... a new question named "new question" 
      , { name: "New Question" }
    ];
  }

  removeQuestion(question) {
    // get the selected quiz and filter out the selected question passed through via the
    // html method call
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== question);
  }
}

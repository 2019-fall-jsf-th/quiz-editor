import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

export interface QuizDisplay {
  name: string;
  questions: string[];
}

export interface QuestionDisplay {
  name: string;
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
                , questions: x.questions
              })
          );
        }
        , error => {
          console.error(error.error);
          this.failedToLoadQuizzes = true;
        });
    console.log(this.quizzes);
  }


  selectedQuiz = undefined;

  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
  }

  addNewQuiz(): number {
    let newQuiz = {'name': 'Untitled', 'questions':[]};
    let appendIndex = this.quizzes.length;

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectQuiz(newQuiz);
    console.table('addNewQuiz', this.selectedQuiz);
    return appendIndex;
  }

  getQuiz(index: number): QuizDisplay {
    if (index < this.quizzes.length) {
      return this.quizzes[index];
    }
  }

  addQuestion() {
    this.selectedQuiz.questions = [...this.selectedQuiz.questions, {name: "New Question"}];
  }

  removeQuestion(question) {
    console.log(`question: ${question}`);
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter( (q, index) => q !== question );
  }
}

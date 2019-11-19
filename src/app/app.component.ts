import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { join } from 'path';

interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
  markedForDelete: boolean;
  newlyAddedQuiz: boolean;
  naiveQuizChecksum: string;
}

interface QuestionDisplay {
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
            , markedForDelete: false
            , newlyAddedQuiz: false
            , naiveQuizChecksum: this.generateQuizChecksum(x)
          }));
        }
        , error => {
          console.error(error.error);
          this.failedToLoadQuizzes = true;
        }
      )

    console.log(this.quizzes);
  }

  generateQuizChecksum(quiz: QuizDisplay) {
    return quiz.name + quiz.questions.map(y => '~' + y.name).join()
  }

  selectedQuiz = undefined;

  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
  }

  addNewQuiz() {

    let newQuiz = { 
      name: 'Untitled Quiz'
      , questions: []
      , markedForDelete: false
      , newlyAddedQuiz: true
      , naiveQuizChecksum:  "" // Isn't needed ? ? ?
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectQuiz(newQuiz);
  }

  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , { name: "New Question" }
    ];
  }

  removeQuestion(question) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== question);
  }

  jsPromisesOne() {
    const x = this.qSvc.getMagicNumberPromise(true);
    console.log(x); // ? ? ?

    // Kevin asked about this, during break...
    //let z = x.then();
    //console.log(z);

    x.then(
      n => {
        console.log(n);

        const y = this.qSvc.getMagicNumberPromise(false);
        console.log(y); // ? ? ? 

        y.then(n => console.log(n)).catch(err => console.error(err));
      }
    )
    .catch(err => console.error(err))
  }

  async jsPromisesTwo() {

    try {
      const x = await this.qSvc.getMagicNumberPromise(true);
      console.log(x); // ? ? ? 
  
      const y = await this.qSvc.getMagicNumberPromise(false);
      console.log(y); // ? ? ?       
    }

    catch(err) {
      console.error(err);
    }
  }

  async jsPromisesThree() {

    try {
      const x = this.qSvc.getMagicNumberPromise(true);
      console.log(x); // ? ? ? 
  
      const y = this.qSvc.getMagicNumberPromise(true);
      console.log(y); // ? ? ?    
      
      const results = await Promise.all([x, y]);
      //const results = await Promise.race([x, y]);
      console.log(results); // ? ? ?
    }

    catch(err) {
      console.error(err);
    }
  }

  get deletedQuizCount() {
    return this.getDeletedQuizzes().length;
  }

  getDeletedQuizzes() {
    return this.quizzes.filter(x => x.markedForDelete);
  }

  get newlyAddedQuizCount() {
    return this.getNewlyAddedQuizzes().length;
  }

  getNewlyAddedQuizzes() {
    return this.quizzes.filter(x => x.newlyAddedQuiz && !x.markedForDelete);
  }

  get editedQuizCount() {
    return this.getEditedQuizzes().length;
  }

  getEditedQuizzes() {
    return this.quizzes.filter(x =>  
      this.generateQuizChecksum(x) != x.naiveQuizChecksum
      && !x.newlyAddedQuiz 
      && !x.markedForDelete
    );
  }
}

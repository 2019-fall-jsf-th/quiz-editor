import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

import {
  trigger,
  transition,
  animate,
  style,
  keyframes
} from '@angular/animations'

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
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailsFromLeft', [
      transition('leftPosition => finalPosition', [
        animate('300ms', keyframes([
          style({ left: '-30px', offset: 0.0 }),
          style({ left: '-20px', offset: 0.25 }),
          style({ left: '-10px', offset: 0.5 }),
          style({ left: '-5px', offset: 0.75 }),
          style({ left: '0px', offset: 1.0 })
        ]))
      ]),
    ]),
    trigger('pulseSaveCancelButtons', [
      transition('nothingToSave => somethingToSave', [
        animate('400ms', keyframes([
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 0.0 }),
          style({ transform: 'scale(1.1)', 'transform-origin': 'top left', offset: 0.5 }),
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 1.0 })
        ]))
      ])
    ])
  ]
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
    this.loadQuizzes();
    console.log(this.quizzes);
  }

  cancelBatchEdits() {
    this.loadQuizzes();
    this.selectedQuiz = undefined;
  }

  selectedQuiz = undefined;

  private loadQuizzes() {
    this.qSvc
      .loadQuizzes()
      .subscribe(data => {
        console.log(data);
        console.log('woo hoo');
        this.quizzes = (<any[]>data).map(x => ({
          name: x.name,
          questions: x.questions,
          markedForDelete: false,
          newlyAddedQuiz: false,
          naiveQuizChecksum: this.generateNaiveQuizChecksum(x)
        }));
      }, error => {
        console.error(error.error);
        this.failedToLoadQuizzes = true;
      });
  }

  generateNaiveQuizChecksum(q: QuizDisplay) {
    return q.name + q.questions.length + q.questions.map(x => '~' + x.name).join('');
  }

  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
    this.detailsAnimationState = 'finalPosition'
  }

  addNewQuiz() {

    const newQuiz = { 
      name: 'Untitled Quiz'
      , questions: []
      , markedForDelete: false
      , newlyAddedQuiz: true
      , naiveQuizChecksum: ""
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

  get numberOfDeletedQuizzes() {
    return this.getDeletedQuizzes().length;
  }

  getDeletedQuizzes() {
    return this.quizzes.filter(x => x.markedForDelete);
  }

  get numberOfAddedQuizzes() {
    return this.getAddedQuizzes().length;
  }

  getAddedQuizzes() {
    return this.quizzes.filter(x => x.newlyAddedQuiz && !x.markedForDelete);
  }

  get numberOfEditedQuizzes() {
    return this.getEditedQuizzes().length;
  }

  getEditedQuizzes() {
    return this.quizzes
      .filter(x => this.generateNaiveQuizChecksum(x) != x.naiveQuizChecksum 
        && !x.newlyAddedQuiz 
        && !x.markedForDelete
      );
  }

  saveBatchEdits() {
    this.qSvc.saveQuizzes(
      this.getEditedQuizzes()
      , []
    )
    .subscribe(
      data => console.log('Number of edited quizzes submitted: ' + data)
      , err => console.error(err)
    );
  }

  detailsAnimationState: string = 'leftPosition';

  detailsAnimationComplete() {
    this.detailsAnimationState = 'leftPosition';
  }

}

import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

// an interface is just a ? of data, shapes data?
// removed temporaryQuestionCount, and added a questions array
interface QuizDisplay {
  name: string;
  questions: DisplayedQuestion[];
  markedForDelete: boolean;
  newlyAddedQuiz: boolean; // added so we can keep track of new quizzes we are adding
  naiveQuizChecksum: string; // for editing quiz behavior
}

interface DisplayedQuestion {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

    // this has been refactored - compresses code and makes it into a method
    this.loadQuizzes();
    console.log(this.quizzes);
  }

  // When we hit cancel, we will just call loadQuizzes again
  cancelBatchEdits() {
    this.loadQuizzes();
    this.selectedQuiz  = undefined; // makes it so no quizzes are selected
  }
  selectedQuiz = undefined;

  // refactored code
  private loadQuizzes() {
    this.qSvc
      // make an asynchronous call to a webservice
      .loadQuizzes()
      .subscribe(data => {
        console.log(data);
        console.log('woohoo');
        this.quizzes = (<any[]>data).map(x => ({
          name: x.name,
          questions: x.questions,
          markedForDelete: false,
          newlyAddedQuiz: false,
          naiveQuizChecksum: this.generateNaiveQuizChecksum(x),
        }));
      }, error => {
        console.error(error.error);
        this.failedToLoadQuizzes = true;
      });
  }

  // map over all of my objects???
  // used for comparison to original(saved?) quizzes and any changes you may make
  generateNaiveQuizChecksum(q: QuizDisplay) {
    return q.name + q.questions.length + q.questions.map(x => '~' + x.name).join('');
  }

  selectQuiz(q) {
    this.selectedQuiz = q;
    console.log(this.selectedQuiz.name);
  }

  // changed questions to an empty array b/c new quizzes will have no questions
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
  }

  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , { name: "New question"}
    ];
  }

  // use filter - b/c you want items in resulting array to match criteria set
  removeQuestion(question) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== question);
  }


  // Promises - nesting of promises
  // .then returns new promises - set up so you can chain them?
  jsPromisesOne() {
    const x = this.qSvc.getMagicNumberPromise(true);
    console.log(x); // ??? -> will return ZoneAwarePromise

    // Kevin asked about this - presumes what async await does?
    let z = x.then();
    console.log(z);

    x.then(
      n => {
        console.log(n);

        const y = this.qSvc.getMagicNumberPromise(false);
        console.log(y); // ???

        y.then(n => console.log(n)).catch(err => console.error(err));
      }
    )
    .catch(err => console.error(err))
  }

  // ways to get out of .then .catch hell
  // the await is taking the .then nonsense and making it work
  // use try catch block to catch errors
  async jsPromisesTwo() {
    try {
      const x = await this.qSvc.getMagicNumberPromise(true);
      console.log(x); // ??? will get 42 if true, uncaught error if false if not in try/catch block
  
      const y = await this.qSvc.getMagicNumberPromise(false);
      console.log(y); // ??? will get 42 if true, will get error message if false
    }

    catch(err) {
      console.error(err);
    }
    
  }

  // if no await, get ZoneAwarePromise
  async jsPromisesThree() {
    try {
      const x = this.qSvc.getMagicNumberPromise(true);
      console.log(x); // ??? will get 42 if true, uncaught error if false if not in try/catch block
  
      const y = this.qSvc.getMagicNumberPromise(true);
      console.log(y); // ??? will get 42 if true, will get error message if false

      // make 2 calls, then await until all the calls are finished
      const results = await Promise.all([x, y]);
      console.log(results); // ??? come back as an array with 2 numbers, if one fails, then we get a console.error and no results

      // get the first one that finishes and display it
      // const results1 = await Promise.race([x, y]);
      // console.log(results1); // ??? 
    }

    catch(err) {
      console.error(err);
    }
    
  }

  // gets the count of deleted quizzes - TS getter property
  get numberOfDeletedQuizzes() {
    return this.getDeletedQuizzes().length;
  }

  getDeletedQuizzes() {
    return this.quizzes.filter(x => x.markedForDelete);
  }
  
  // gets the count of added quizzes - TS getter property
  get numberOfAddedQuizzes() {
    return this.getAddedQuizzes().length;
  }

  // give me quizzes that are newly added and not marked for delete
  getAddedQuizzes() {
    return this.quizzes.filter(x => x.newlyAddedQuiz && !x.markedForDelete);
  }

  // gets the count of edited quizzes - TS getter property
  get numberOfEditedQuizzes() {
    return this.getEditedQuizzes().length;
  }

  // give me quizzes that are edited, not newly added, and not marked for delete
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
      data => console.log('Number of edited quizzes submitted:' + data)
      , err => console.error(err)
    );
  }
  
}

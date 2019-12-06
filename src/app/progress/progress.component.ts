import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input() maxProgress = 100;
  @Input() progressType: string = 'primary';
  @Input() currentProgress: number = 50;
  @Input() currentHeight: number = .97;

  constructor() { }

  ngOnInit() {
    console.log('some at');

    let interval = setInterval(() => {}, 200)
  }

  getCurrentProgessPercent() {
    return `${ (this.currentProgress / this.maxProgress).toFixed(2) }%`;
  }

  getCurrentHeightRems() {
    return `${ this.currentHeight }rem`;
  }

  getMaxProgress() {
    return this.maxProgress;
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProgressComponent } from './progress/progress.component'

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
    , HttpClientModule
    , BrowserAnimationsModule
    , NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

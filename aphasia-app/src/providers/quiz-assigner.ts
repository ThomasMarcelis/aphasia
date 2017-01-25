import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import { Quiz } from '../models/quiz';
import { Observable }     from 'rxjs/Observable';

/*
  Generated class for the QuizAssigner provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuizAssigner {

  private quizUrl = 'http://127.0.0.1:5000/quiz';

  constructor(public http: Http) {}

  getNewQuiz(name: string): Observable<Quiz> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.quizUrl, "name=" + name, { headers: headers})
      .map(response => <Quiz>response.json()["quiz"]);
  }




}

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

  private quizUrl = 'http://192.73.239.55:5000/quiz';
  private questionUrl = '/question/';

  constructor(public http: Http) {}

  getNewQuiz(name: string): Observable<Quiz> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(this.quizUrl, "name=" + name, { headers: headers})
      .map(response => <Quiz>response.json()["quiz"]);
  }

  sendQuizAnswer(quizId: number, questionId: number,answer: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let postUrl = this.quizUrl + '/' + quizId + '/question/' + questionId;

    console.error(postUrl);

    return this.http.post(postUrl, "answer=" + answer, { headers: headers});
  }




}

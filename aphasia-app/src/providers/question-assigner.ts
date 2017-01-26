import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import { Question } from '../models/question';
import { Observable }     from 'rxjs/Observable';


/*
  Generated class for the QuestionAssigner provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QuestionAssigner {


  private quizUrl = 'http://127.0.0.1:5000/quiz/';
  private newQuestionUrl = '/question/next';

  constructor(public http: Http) {}


  getNewQuestion(quizId: number): Observable<Question> {
    return this.http.get(this.quizUrl + quizId + this.newQuestionUrl)
      .map(response => <Question>response.json()["question"]);
  }





}

import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import { Quiz } from '../models/quiz';
import { Observable }     from 'rxjs/Observable';
import { Transfer } from 'ionic-native'
import { Question } from '../models/question';


@Injectable()
export class QuizAssigner {

  //FIXME: This should probably be an environment variable
  private quizUrl = 'http://127.0.0.1:5000/quiz';

  //FIXME: Make hardcoded URL's configurable

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

  sendSpeechAnswer(quizId: number, questionId: number, fileName: string) {
    let options = {
      fileKey: 'file',
      fileName: fileName,
      mimeType: 'audio/wav',
      chunkedMode: false
    }

    var ft = new Transfer();

    let postUrl = this.quizUrl + '/' + quizId + '/question/' + questionId + '/recording';

    ft.upload("/storage/sdcard/" + fileName, encodeURI(postUrl), options, true).then((data) => data).catch((data) => console.error(data))
  }

  getNewQuestion(quizId: number): Observable<Question> {
    return this.http.get(this.quizUrl + '/' + quizId + '/question/next')
      .map(response => <Question>response.json()["question"]);
  }


}

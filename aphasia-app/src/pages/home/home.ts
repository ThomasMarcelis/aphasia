import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { QuizAssigner } from '../../providers/quiz-assigner';
import { TextToSpeech } from 'ionic-native';
import {Quiz} from "../../models/quiz";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ QuizAssigner ]
})
export class HomePage {
  constructor(public navCtrl: NavController, private quizAssigner: QuizAssigner) {


  }


  startQuiz() {

    TextToSpeech.speak(
      {
        text: 'Hello, World',
        locale: 'en-GB',
        rate: 1.5
      }
    )
      .then(() => alert("gesproken"));

    this.quizAssigner.getNewQuiz("default").subscribe(
      quiz => this.navCtrl.push(QuizPage, {
        quiz: quiz
      }),
      error => console.error("error getting quiz")
    )
  }

}



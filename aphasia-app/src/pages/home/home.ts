import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { QuizAssigner } from '../../providers/quiz-assigner';
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

    this.quizAssigner.getNewQuiz("default").subscribe(
      quiz => this.navCtrl.push(QuizPage, {
        quiz: quiz
      }),
      error => console.error("error getting quiz")
    )
  }

}



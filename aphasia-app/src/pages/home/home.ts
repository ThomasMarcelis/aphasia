import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { QuizAssigner } from '../../providers/quiz-assigner';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ QuizAssigner],
})
export class HomePage {
  public name: string;

  constructor(public platform: Platform, public navCtrl: NavController, private quizAssigner: QuizAssigner) {

    this.name = "Patient" //Default filled in name

  }

  startQuiz() {
    this.quizAssigner.getNewQuiz(this.name).subscribe(
      quiz => this.navCtrl.push(QuizPage, {
        quiz: quiz
      }),
      error => console.error("error getting quiz"  + error)
    )
  }

}



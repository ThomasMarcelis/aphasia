import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { QuizAssigner } from '../../providers/quiz-assigner';
import { TextToSpeech } from 'ionic-native';
import {Quiz} from "../../models/quiz";
import {TranslateService, TranslatePipe} from "ng2-translate";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ QuizAssigner, TranslateService],
})
export class HomePage {
  private translate: TranslateService;

  constructor(public navCtrl: NavController, private quizAssigner: QuizAssigner, translate: TranslateService) {

    this.translate = translate;
    this.translate.setDefaultLang('nl');

  }



  startQuiz() {

/*    this.translate.get('QUESTION').subscribe(
      value => {
        // value is our translated string
        let alertTitle = value;
        alert(value)
      }
    );*/

    this.quizAssigner.getNewQuiz("default").subscribe(
      quiz => this.navCtrl.push(QuizPage, {
        quiz: quiz
      }),
      error => console.error("error getting quiz")
    )
  }

}



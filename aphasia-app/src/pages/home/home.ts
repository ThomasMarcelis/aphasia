import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { QuizAssigner } from '../../providers/quiz-assigner';
import { TextToSpeech } from 'ionic-native';
import {Quiz} from "../../models/quiz";
import {TranslateService, TranslatePipe} from "ng2-translate";
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ QuizAssigner, TranslateService],
})
export class HomePage {
  private translate: TranslateService;
  public name: string;

  constructor(public platform: Platform, public navCtrl: NavController, private quizAssigner: QuizAssigner, translate: TranslateService) {

    /*platform.registerBackButtonAction(() => {

      this.navCtrl.push(HomePage)
    }, 100);*/

    this.name = "Patient"
    this.translate = translate;
    var userlang = navigator.language.split('-')[0];
    if(userlang != "nl") {
      userlang = "en";
    }
    this.translate.setDefaultLang(userlang);
    this.translate.use(userlang);

  }



  startQuiz() {

/*    this.translate.get('QUESTION').subscribe(
      value => {
        // value is our translated string
        let alertTitle = value;
        alert(value)
      }
    );*/

    this.quizAssigner.getNewQuiz(this.name).subscribe(
      quiz => this.navCtrl.push(QuizPage, {
        quiz: quiz
      }),
      error => console.error("error getting quiz")
    )
  }

}



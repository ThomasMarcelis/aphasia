import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Quiz} from "../../models/quiz";

/*
  Generated class for the QuizAssigner page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage {
   public quiz: Quiz;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.error(this.navParams.get('quiz'));
    this.quiz = this.navParams.get('quiz');
  }

}

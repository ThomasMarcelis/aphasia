import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Quiz} from "../../models/quiz";
import {Question} from "../../models/question";
import {QuestionAssigner} from "../../providers/question-assigner";
import {QuizAssigner} from "../../providers/quiz-assigner";
import {HomePage} from "../home/home";

/*
  Generated class for the QuizAssigner page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
  providers: [ QuestionAssigner, QuizAssigner ]
})
export class QuizPage {
   public quiz: Quiz;
   public question: Question;
   public choice: string;


  constructor(public navCtrl: NavController, public quizAssigner: QuizAssigner, public navParams: NavParams, private questionAssigner: QuestionAssigner) {
    console.error(this.navParams.get('quiz'));
    this.quiz = this.navParams.get('quiz');

    this.question = new Question(0,'','','','','');
    this.choice = "";

    this.questionAssigner.getNewQuestion(this.quiz.id).subscribe(
      question => this.question = question,
      error => {
        console.error(error);
        this.navCtrl.push(HomePage);
      }
    )


  }

  submitAnswer() {
    if (this.choice == "") {
      console.error("empty choice");
    } else {
      console.error(this.choice);

      this.quizAssigner.sendQuizAnswer(this.quiz.id, this.question.id, this.choice)
        .subscribe(
          response => this.navCtrl.push(QuizPage, {
            quiz: this.quiz
          }),
          error => console.error(error)
        )

    }
  }

}

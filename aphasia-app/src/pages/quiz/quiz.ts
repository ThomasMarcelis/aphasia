import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Quiz} from "../../models/quiz";
import {Question} from "../../models/question";
import {QuestionAssigner} from "../../providers/question-assigner";
import {QuizAssigner} from "../../providers/quiz-assigner";
import {HomePage} from "../home/home";
import { TextToSpeech, MediaPlugin } from 'ionic-native';
import {TranslateService, TranslatePipe} from "ng2-translate";
import { Platform } from 'ionic-angular';

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
   public questionType: string;
   public answerType: string;
   public translate: TranslateService;
   public media: MediaPlugin;
   public recording: boolean;
   public pickedOption: boolean;


  constructor(public platform: Platform, public navCtrl: NavController, public quizAssigner: QuizAssigner, public navParams: NavParams, private questionAssigner: QuestionAssigner, translate: TranslateService) {
    this.translate = translate;
    var userlang = navigator.language.split('-')[0];
    if(userlang != "nl") {
      userlang = "en";
    }
    this.translate.setDefaultLang(userlang);
    this.translate.use(userlang);

    this.pickedOption = true;

    platform.registerBackButtonAction(() => {

      this.navCtrl.push(HomePage)
    }, 100);


    this.recording = false;
    console.error(this.navParams.get('quiz'));
    this.quiz = this.navParams.get('quiz');


    this.question = new Question(0,'','','','','');
    this.choice = "";

    this.questionAssigner.getNewQuestion(this.quiz.id).subscribe(
      question => {
        this.question = question;
        this.processQuestion()
      },
      error => {
        console.error(error);
        this.navCtrl.push(HomePage);
      }
    )




  }

  private processQuestion() {
    var types = this.question.type.split("/");
    this.questionType = types[0];
    this.answerType = types[1];
    if(this.questionType == "speech") {
      this.playQuestion();
    } else {
      this.choice = this.question.answer1;
    }
    if(this.answerType == "speech") {
      this.media = new MediaPlugin(this.quiz.id + '-' + this.question.id + '.wav');
          this.pickedOption = false;
    }
  }

  playQuestion() {

    var userlang = navigator.language.split('-')[0];
    if(userlang == "nl") {
      userlang = "de-DE";
    } else {
      userlang = "en-GB"
    }

    this.translate.get(this.question.title).subscribe( (translatedTitle) => {
      TextToSpeech.speak(
          {
            text: translatedTitle,
            locale: userlang,
            rate: 1
          }
        )
    }
    )

    

  }

  submitAnswer() {
    this.pickedOption = false;
    if(this.answerType == "speech") {

      this.quizAssigner.sendSpeechAnswer(this.quiz.id, this.question.id, this.quiz.id + '-' + this.question.id + '.wav');
  
      this.navCtrl.push(QuizPage, {
            quiz: this.quiz
          });


    } else {
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

startRecording() {
  this.media.startRecord();
  this.recording = true;
}


stopRecording() {
  this.pickedOption = true;
  this.media.stopRecord();
  this.recording = false;
}

}

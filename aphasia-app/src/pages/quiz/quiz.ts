import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Quiz} from "../../models/quiz";
import {Question} from "../../models/question";
import {QuizAssigner} from "../../providers/quiz-assigner";
import {HomePage} from "../home/home";
import { TextToSpeech, MediaPlugin } from 'ionic-native';
import {TranslateService, TranslatePipe} from "ng2-translate";
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
  providers: [ QuizAssigner ]
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


  constructor(public platform: Platform, public navCtrl: NavController, public quizAssigner: QuizAssigner, public navParams: NavParams, translate: TranslateService) {
    this.translate = translate;
    this.setLanguage();

    platform.registerBackButtonAction(() => {
      this.navCtrl.push(HomePage)
    }, 100);

    this.pickedOption = true; // Tracks if user has selected an answer (by default we select answer 1)
    this.recording = false; // Tracks if there is an active recording

    this.quiz = this.navParams.get('quiz');

    this.question = new Question(0,'Fetching Question...','','','',''); // Placeholder while fetching
    this.choice = "";

    
    
    this.getNewQuestion();
  }

  private processQuestion() {
    var types = this.question.type.split("/");
    this.questionType = types[0];
    this.answerType = types[1];
    
    if(this.questionType == "speech") {
      this.playQuestion();
    } 

    if(this.answerType == "speech") {
      this.media = new MediaPlugin(this.quiz.id + '-' + this.question.id + '.wav');
      //Speech does not have a default selection
      this.pickedOption = false;
    } else {
      //But all other questions do
      this.choice = this.question.answer1;
    }
  }

  playQuestion() {
    var userlang = navigator.language.split('-')[0];
    if(userlang == "nl") {
      //FIXME: Android does not support Dutch speech?
      userlang = "de-DE";
    } else {
      userlang = "en-GB"
    }

    this.translate.get(this.question.title).subscribe( (translatedTitle) => {
      TextToSpeech.speak({
            text: translatedTitle,
            locale: userlang,
            rate: 1
          })
    })
  }

  submitAnswer() {
    this.pickedOption = false;
    if(this.answerType == "speech") {

      this.quizAssigner.sendSpeechAnswer(this.quiz.id, this.question.id, this.quiz.id + '-' + this.question.id + '.wav');
  
      this.getNewQuestion();


    } else {
       if (this.choice == "") {
        console.error("empty choice");
      } else {
        console.error(this.choice);

       this.getNewQuestion();
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

private setLanguage() {
  var userlang = navigator.language.split('-')[0];
      if(userlang != "nl") {
        userlang = "nl";
      }
      this.translate.setDefaultLang(userlang);
      this.translate.use(userlang);
}
  
  private getNewQuestion() {
    this.quizAssigner.getNewQuestion(this.quiz.id).subscribe(
      question => {
        this.question = question;
        this.processQuestion();
      },
      error => {
        console.error(error);
        this.navCtrl.push(HomePage);
      } 
  }

}

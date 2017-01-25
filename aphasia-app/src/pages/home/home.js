"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var quiz_1 = require('../quiz/quiz');
var quiz_assigner_1 = require('../../providers/quiz-assigner');
var HomePage = (function () {
    function HomePage(navCtrl, quizAssigner) {
        this.navCtrl = navCtrl;
        this.quizAssigner = quizAssigner;
    }
    HomePage.prototype.startQuiz = function () {
        var _this = this;
        this.quizAssigner.getNewQuiz("default").subscribe(function (quiz) { return _this.navCtrl.push(quiz_1.QuizPage, {
            quiz: quiz
        }); }, function (error) { return console.error("error getting quiz"); });
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html',
            providers: [quiz_assigner_1.QuizAssigner]
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;

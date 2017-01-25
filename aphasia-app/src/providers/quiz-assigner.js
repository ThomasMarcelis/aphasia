"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/Observable');
/*
  Generated class for the QuizAssigner provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var QuizAssigner = (function () {
    function QuizAssigner(http) {
        this.http = http;
        this.quizUrl = 'http://127.0.0.1:5000/quiz';
    }
    QuizAssigner.prototype.getNewQuiz = function (name) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.quizUrl, "name=" + name, { headers: headers })
            .map(function (response) { return response.json()["quiz"]; });
    };
    QuizAssigner = __decorate([
        core_1.Injectable()
    ], QuizAssigner);
    return QuizAssigner;
}());
exports.QuizAssigner = QuizAssigner;

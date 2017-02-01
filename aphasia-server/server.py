from flask import Flask, request, jsonify, g
from flask_cors import CORS, cross_origin
import random
import os
from models import *

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/root/upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/quiz', methods=['POST'])
def newQuiz():
    db =  get_db()
    #Server will return 400 bad request if not provided
    name = request.form['name']
    quiz = Quiz.startNewQuiz(name)
    answer = {
            "quiz": {
                "id": quiz.quizId,
                "name": quiz.name
                }
            }
    return jsonify(**answer)


@app.route('/quiz/<int:quizId>/question/next', methods=['GET'])
def nextQuestion(quizId):
    quiz = Quiz.getQuiz(quizId)
    if quiz.getNumberOfQuestionsAnswered() > 4:
        return "answered 5 questions already!", 400
    question = quiz.getNewQuestion()
    if question == None:
        return "Couldn't find you a question", 400
    return jsonify(**quiz.getNewQuestion().toJson())


@app.route('/quiz/<int:quizId>/question/<int:questionId>', methods=['POST'])
def submitAnswer(quizId, questionId):
    answer = request.form['answer'];
    Answer(quizId, questionId, answer).saveToDB()
    return "OK"

@app.route('/quiz/<int:quizId>/question/<int:questionId>/recording', methods=['POST'])
def submitRecording(quizId, questionId):
    if 'file' not in request.files:
        return "No file", 400
    file = request.files['file']
    if file.filename == '':
        return "Empty filename", 400
    #FIXME: Insecure file upload (Remote code execution)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    answer = Answer(quizId, questionId, file.filename).saveToDB()
    return "OK"


if __name__ == "__main__":
    app.run(host="127.0.0.1")
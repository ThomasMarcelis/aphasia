from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

class Quiz:
    def __init__(self, quizId, name, asked, answers):
        self.quizId = quizId
        self.name = name
        self.asked = asked
        self.answers = answers

    @staticmethod
    def startNewQuiz(name):
        return Quiz(1, name, [], [])

    @staticmethod
    def getQuiz(quizId):
        return Quiz(quizId, 'test', [], [])

    def getNewQuestion(self):
        return Question(1,'testtitle',['testanswer1', 'testanswer2'])

class Question:
    def __init__(self, questionId, title, answers):
        self.questionId = questionId
        self.title = title
        self.answers = answers

    def toJson(self):
        return {
                "question": {
                    "title": self.title,
                    "answers": self.answers
                    }
                }

@app.route('/quiz', methods=['POST'])
def newQuiz():
    print(request.headers)
    print(request.form)
    name = request.form['name']
    quiz = Quiz.startNewQuiz(name)
    answer = {
            "quiz": {
                "id": quiz.quizId,
                "name": quiz.name
                }
            }
    return jsonify(**answer)


@app.route('/quiz/<int:quizId>/question/next', methods=['get'])
def nextQuestion(quizId):
    quiz = Quiz.getQuiz(quizId)
    return jsonify(**quiz.getNewQuestion().toJson())




if __name__ == "__main__":
    app.run()

from flask import Flask, request, jsonify, g
from flask_cors import CORS, cross_origin
import sqlite3
import random
app = Flask(__name__)
CORS(app)

# DB Stuff
def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect("quiz.db")
    rv.row_factory = sqlite3.Row
    return rv

class Quiz:
    def __init__(self, quizId, name, asked, answers):
        self.quizId = quizId
        self.name = name
        self.asked = asked
        self.answers = answers

    @staticmethod
    def startNewQuiz(name):
        db = get_db()

        cursor = db.execute("INSERT INTO quiz (name) VALUES('" + name + "');")
        db.commit()

        return Quiz.getQuiz(cursor.lastrowid)

    @staticmethod
    def getQuiz(quizId):
        db = get_db()
        cursor = db.execute("SELECT * FROM quiz WHERE id=" + str(quizId) + ";")
        row = cursor.fetchone()
        return Quiz(quizId, row["name"], [], [])

    def getNewQuestion(self):
        db = get_db()
        cursor = db.execute(
            "SELECT * FROM question WHERE id NOT IN ( SELECT questionId FROM question  JOIN answer ON answer.questionId = question.id WHERE quizId=" + str(self.quizId) + ");")
        chosen = random.choice(cursor.fetchall())
        if chosen == None:
            return None
        return Question(chosen["id"], chosen["title"], chosen["type"], chosen["answer1"], chosen["answer2"], chosen["answer3"])

    def getNumberOfQuestionsAnswered(self):
        db = get_db()
        cursor = db.execute("SELECT COUNT(*) as count FROM answer WHERE quizId=" + str(self.quizId) + ";")
        count = cursor.fetchone()["count"]
        return count


class Question:
    def __init__(self, questionId, title, qType, answer1, answer2, answer3):
        self.questionId = questionId
        self.title = title
        self.qType = qType
        self.answer1 = answer1
        self.answer2 = answer2
        self.answer3 = answer3

    @staticmethod
    def getQuestion(questionId):
        db = get_db()
        cursor = db.execute("SELECT * FROM question WHERE id=" + str(questionId) + ";")
        row = cursor.fetchone()
        return Question(row["id"], row["title"],row["type"],row["answer1"],row["answer2"],row["answer3"])

    def toJson(self):
        return {
                "question": {
                    "title": self.title,
                    "id": self.questionId,
                    "type": self.qType,
                    "answer1": self.answer1,
                    "answer2": self.answer2,
                    "answer3": self.answer3,
                    }
                }

class Answer:
    def __init__(self, quizId, questionId, answer):
        self.quizId = quizId
        self.questionId = questionId
        self.answer = answer

    def saveToDB(self):
        db = get_db()
        db.execute("INSERT INTO answer (quizId,questionId,answer) VALUES(?,?,?)", (self.quizId, self.questionId, self.answer))
        db.commit()

@app.route('/quiz', methods=['POST'])
def newQuiz():
    db =  get_db()
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





if __name__ == "__main__":
    app.run(host="192.73.239.55")


from db import get_db
import random

class Quiz:
    def __init__(self, quizId, name, asked, answers):
        self.quizId = quizId
        self.name = name
        self.asked = asked
        self.answers = answers

    @staticmethod
    def startNewQuiz(name):
        db = get_db()

        cursor = db.execute('INSERT INTO quiz (name) VALUES(?);', (name,))
        db.commit()

        return Quiz.getQuiz(cursor.lastrowid)

    @staticmethod
    def getQuiz(quizId):
        db = get_db()
        cursor = db.execute("SELECT * FROM quiz WHERE id=?;", (quizId,))
        row = cursor.fetchone()
        return Quiz(quizId, row["name"], [], [])

    def getNewQuestion(self):
        db = get_db()
        cursor = db.execute(
            "SELECT * FROM question WHERE id NOT IN ( SELECT questionId FROM question  JOIN answer ON answer.questionId = question.id WHERE quizId=?);", (self.quizId,))
        chosen = random.choice(cursor.fetchall())
        if chosen == None:
            return None
        return Question(chosen["id"], chosen["title"], chosen["type"], chosen["answer1"], chosen["answer2"], chosen["answer3"])

    def getNumberOfQuestionsAnswered(self):
        db = get_db()
        cursor = db.execute("SELECT COUNT(*) as count FROM answer WHERE quizId=?;", (self.quizId,))
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
        cursor = db.execute("SELECT * FROM question WHERE id=?;", (quesetionId,))
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
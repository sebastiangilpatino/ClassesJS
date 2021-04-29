class Student {
    constructor(studentID) {
        this.studentID = studentID;
        this.questionsArray = [];
        this.score = 0;
    }

    addAnswer(answer) {
        this.questionsArray.push(answer);
    }

    getStudentID() {
        return this.studentID;
    }

    getAnswerArray() {
        return this.questionsArray;
    }

    setScore(score) {
        this.score = score;
    }

    getScore(){
        return this.score;
    }
}

class Question {
    constructor(questionID, answers) {
        this.questionID = questionID;
        this.answers = answers;
    }

    getQuestionID() {
        return this.questionID;
    }

    getAnswer() {
        return this.answers;
    }
}

class Quiz {
    constructor(questions, students) {
        this.questions = questions;
        this.students = students;
    }

    scoreStudentBySid(studentID) {
        let score = 0;
        let studentEvaluating = this.students.filter(x => x.getStudentID() == studentID);
        let helper = studentEvaluating.map(x => x.getAnswerArray());
        let studentAnswers = [].concat.apply([], helper);
        
        
        for (let i = 0; i < studentAnswers.length; i++) {
            for (let j = 0; j < this.questions.length; j++) {
                if (studentAnswers[i].getQuestionID() == this.questions[j].getQuestionID()
                    && studentAnswers[i].getAnswer() == this.questions[j].getAnswer()) {
                    score++;
                }
            }
        }

        studentEvaluating[0].setScore(score);

        return score;

    }

    getAverageScore() {
        let average = this.students.map(x => x.getScore() ).reduce((acum, current) => acum + current/this.students.length,0);
        return average;
    }

}

const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));

const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));

const students = [student1, student2];
const questions = [new Question(1, 'b'), new Question(2, 'a'), new Question(3, 'b')];
const quiz = new Quiz(questions, students);

let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); //Expected Result: 3
let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); //Expected Result: 2

let average = quiz.getAverageScore();
console.log(average); //Expected Reuslt: 2.5
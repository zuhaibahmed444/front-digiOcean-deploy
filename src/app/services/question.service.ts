import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import exambaseUrl from './helper-exam';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  public getQuestionsOfQuiz(qid) {
    return this._http.get(`${exambaseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid) {
    return this._http.get(`${exambaseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuestion(question) {
    return this._http.post(`${exambaseUrl}/question/`, question);
  }
  //delete question
  public deleteQuestion(questionId) {
    return this._http.delete(`${exambaseUrl}/question/${questionId}`);
  }

  //eval quiz
  public evalQuiz(questions) {
    return this._http.post(`${exambaseUrl}/question/eval-quiz`, questions);
  }
  //
  public evalmail(evalreturn){
    return this._http.post(`${exambaseUrl}/question/result/mail`, evalreturn);
  }

}

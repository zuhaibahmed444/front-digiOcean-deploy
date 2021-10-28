import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import exambaseUrl from './helper-exam';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizzes() {
    return this._http.get(`${exambaseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz) {
    return this._http.post(`${exambaseUrl}/quiz/`, quiz);
  }

  //delete quiz
  public deleteQuiz(qId) {
    return this._http.delete(`${exambaseUrl}/quiz/${qId}`);
  }

  //get the single quiz

  public getQuiz(qId) {
    return this._http.get(`${exambaseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz) {
    return this._http.put(`${exambaseUrl}/quiz/`, quiz);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid) {
    return this._http.get(`${exambaseUrl}/quiz/category/${cid}`);
  }
  //qet active quizzes
  public getActiveQuizzes() {
    return this._http.get(`${exambaseUrl}/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid) {
    return this._http.get(`${exambaseUrl}/quiz/category/active/${cid}`);
  }
}

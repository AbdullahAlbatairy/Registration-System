import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  private baseStudentURL = "http://localhost:8080/student"
  private getAllCoursesRegistered = "/courses-registered-list"
  private getAllCoursesAvailable = "/courses-available-list"
  private addCourseToStudentURL = "/course-add"


  constructor(private httpClient: HttpClient) { }

  
  
  getAllCoursesForStudentRegistered(studentId: string): Observable<any>{
    return this.httpClient.get(`${this.baseStudentURL}${this.getAllCoursesRegistered}/${studentId}`)
  }

  getAllCoursesForStudentAvailable(studentId: string): Observable<any>{
    return this.httpClient.get(`${this.baseStudentURL}${this.getAllCoursesAvailable}/${studentId}`)
  }

  addCourseToStudent(studentId: string, course: Course){
    return this.httpClient.post(`${this.baseStudentURL}${this.addCourseToStudentURL}/${studentId}`, course);
    
  }
}

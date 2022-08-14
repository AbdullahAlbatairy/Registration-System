import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorCourseService {

  private baseInstructorURL = "http://localhost:8080/instructor"
  private allCourses = "/courses-list"
  private allStudents = "/students-list"

  constructor(private httpClient: HttpClient) { }


  getAllCourseForInstructor(instructorId: string): Observable<any> {
    
    return this.httpClient.get(`${this.baseInstructorURL}${this.allCourses}/${instructorId}`)

  }
  getAllStudentsForCourseForInstructor(courseId?: number): Observable<any> {
    return this.httpClient.get(`${this.baseInstructorURL}${this.allCourses}/${courseId}${this.allStudents}`)

  }
}

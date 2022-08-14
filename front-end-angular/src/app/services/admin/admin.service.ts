import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseURL = "http://localhost:8080"

  //Student URLs
  private studentBaseURL = "/student"
  private allStudents = "/students-list"

  //Instructor URLs
  private instructorBaseURL = "/instructor"
  private allInstructors = "/instructors-list"

  //Course URLs
  private courseBaseURL = "/course"
  private allCourses = "/courses-list"

  constructor(private httpClient: HttpClient) { }

  getAllStudent(): Observable<any> {
    return this.httpClient.get(this.studentBaseURL + this.allStudents);
  }

  getAllInstructor(): Observable<any> {
    return this.httpClient.get(this.instructorBaseURL + this.allInstructors);
  }

  getAllCourses(): Observable<any> {
    return this.httpClient.get(this.courseBaseURL + this.allCourses);
  }


}

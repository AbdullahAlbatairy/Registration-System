import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/student.model';


@Injectable({
  providedIn: 'root'
})
export class AdminStudentService {

  private studentBaseURL = "http://localhost:8080/student"
  private allStudents = "/students-list"
  private addStudent = "/student-add"
  private editStudent = "/student-edit"
  private deleteStudent = "/student-delete"

  constructor(private httpClient: HttpClient) { }



  getAllStudent(): Observable<any> {
    return this.httpClient.get(this.studentBaseURL + this.allStudents);
  }

  addAStudent(student: Student) {
    return this.httpClient.post(this.studentBaseURL + this.addStudent, student);

  }

  editAStudent(student: Student) {

    return this.httpClient.put(this.studentBaseURL + this.editStudent, student);
  }
  deleteAStudent(studentId?: number) {
    return this.httpClient.delete(`${this.studentBaseURL}${this.deleteStudent}/${studentId}`);
  }





}



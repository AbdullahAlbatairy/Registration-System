import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from 'src/app/models/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class AdminInstructorService {

  private instructorBaseURL = "http://localhost:8080/instructor"
  private allInstructors = "/instructors-list"
  private addInstructor = "/instructor-add"
  private editInstructor = "/instructor-edit"
  private deleteInstructor = "/instructor-delete"

  constructor(private httpClient: HttpClient) {

  }

  getAllInstructor(): Observable<any> {
    return this.httpClient.get(this.instructorBaseURL + this.allInstructors);
  }

  

  addAnInstructor(instructor: Instructor) {
    return this.httpClient.post(this.instructorBaseURL + this.addInstructor, instructor);

  }

  editAnInstructor(instructor: Instructor) {

    return this.httpClient.put(this.instructorBaseURL + this.editInstructor, instructor);
  }
  deleteAnInstructor(instructorId?: number) {
    return this.httpClient.delete(`${this.instructorBaseURL}${this.deleteInstructor}/${instructorId}`);
  }
}

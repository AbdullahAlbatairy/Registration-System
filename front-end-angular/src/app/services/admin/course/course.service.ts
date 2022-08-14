import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {

  private courseBaseURL = "http://localhost:8080/course"
  private allCourses = "/courses-list"
  private allCourseInstructorsAvailable = "/instructors-for-course-list-available"
  private allCourseInstructorsRegister = "/instructors-for-course-list-register"
  private allCourseStudentsAvailable = "/students-for-course-list-available"
  private allCourseStudentsRegister = "/students-for-course-list-register"
  private addCourse = "/course-add"
  private addCourseInstructor = "/course-add-instructor"
  private addCourseStudent = "/course-add-student"
  private deleteCourseInstructor = "/course-delete-instructor"
  private deleteCourseStudent = "/course-delete-student"
  private editCourse = "/course-edit"
  private deleteCourse = "/course-delete"



  constructor(private httpClient: HttpClient) { }


  getAllCourses(): Observable<any> {
    return this.httpClient.get(this.courseBaseURL + this.allCourses);
  }

  getAllInstructorForACourseAvailable(courseId?: number): Observable<any> {
    return this.httpClient.get(`${this.courseBaseURL}${this.allCourseInstructorsAvailable}/${courseId}`);
  }

  getAllStudentsForACourseAvailable(courseId?: number): Observable<any> {
    return this.httpClient.get(`${this.courseBaseURL}${this.allCourseStudentsAvailable}/${courseId}`);

  }

  getAllInstructorForACourseRegistered(courseId?: number): Observable<any> {
    return this.httpClient.get(`${this.courseBaseURL}${this.allCourseInstructorsRegister}/${courseId}`);

  }



  getAllStudentsForCourseRegistered(courseId?: number): Observable<any> {
    return this.httpClient.get(`${this.courseBaseURL}${this.allCourseStudentsRegister}/${courseId}`);

  }

  addACourse(course: Course) {
    return this.httpClient.post(this.courseBaseURL + this.addCourse, course);
  }

  addInstructorToCourse(instructorId?: number, courseId?: number): Observable<any> {


    const params = new HttpParams()
      .set('courseId', courseId as number)
      .set('instructorId', instructorId as number);
    return this.httpClient.put(this.courseBaseURL + this.addCourseInstructor, null, { params: params })

  }

  addStudentToCourse(studentId?: number, courseId?: number): Observable<any> {


    const params = new HttpParams()
      .set('courseId', courseId as number)
      .set('studentId', studentId as number);
    return this.httpClient.put(this.courseBaseURL + this.addCourseStudent, null, { params: params })

  }

  editACourse(course: Course) {
    return this.httpClient.put(this.courseBaseURL + this.editCourse, course);
  }
  deleteACourse(courseId?: number) {
    return this.httpClient.delete(`${this.courseBaseURL}${this.deleteCourse}/${courseId}`);
  }

  deleteInstructorFromCourse(instructorId?: number, courseId?: number): Observable<any> {

    const params = new HttpParams()
      .set('courseId', courseId as number)
      .set('instructorId', instructorId as number);
    return this.httpClient.delete(this.courseBaseURL + this.deleteCourseInstructor, { params: params })

  }

  deleteStudentFromCourse(studentId?: number, courseId?: number): Observable<any> {

    const params = new HttpParams()
      .set('courseId', courseId as number)
      .set('studentId', studentId as number);
    return this.httpClient.delete(this.courseBaseURL + this.deleteCourseStudent, { params: params })

  }
}

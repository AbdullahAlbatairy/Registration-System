import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { AdminCourseService } from 'src/app/services/admin/course/course.service';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],

})
export class AdminCourseListComponent implements OnInit {

  courses: Course[];
  selectedCourses: Course[];
  courseDialog: boolean;
  instructorDialog: boolean;
  studentDialog: boolean;
  submitted: boolean;
  course: Course;

  isAdding = false;
  isEditing = false;
  isAddingInstructor = false;
  isViewingInstructor = false;
  isAddingStudent = false;
  isViewingStudent = false;


  //Data binding with edit course component
  currentId: number;
  courseName: string;
  courseDesc: string;
  courseId?: number;

  constructor(private courseService: AdminCourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllCourses();

  }



  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      courses => {
        this.courses = courses;
      }
    )
  }

  addingACourse() {

    this.isAdding = true;
    this.isEditing = false;
    this.isAddingInstructor = false;
    this.isViewingInstructor = false;
    this.isAddingStudent = false;
    this.isViewingStudent = false;
    this.course = {
      courseName: '',
      courseDesc: ''
    };
    this.submitted = false;
    this.courseDialog = true;

  }

  editCourse(course: Course) {

    this.isEditing = true;
    this.isAdding = false;
    this.isAddingInstructor = false
    this.isViewingInstructor = false
    this.isAddingStudent = false;
    this.isViewingStudent = false;
    this.course = { ...course };
    this.courseDialog = true;
  }

  deleteCourse(course: Course) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + course.courseName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.courseService.deleteACourse(course.id).subscribe(
          () => {
            this.updateDeletedCourse(course)
          }
        )
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Course Deleted', life: 3000 });
      }
    });
  }




  //Update Display 
  updateAddedCourses(course: Course) {
    this.getAllCourses();

  }

  cancel() {
    this.isEditing = false;
    this.isAdding = false;
    this.isAddingInstructor = false
    this.isViewingInstructor = false
    this.isAddingStudent = false;
    this.isViewingStudent = false;
  }

  updateEditedCourses(editedCourse: Course) {
    var foundIndex = this.courses.findIndex(course => course.id == editedCourse.id)
    this.courses[foundIndex].courseName = editedCourse.courseName;
    this.courses[foundIndex].courseDesc = editedCourse.courseDesc;

  }

  updateDeletedCourse(deletedCourse: Course) {
    var foundIndex = this.courses.findIndex(course => course.id == deletedCourse.id)
    this.courses.splice(foundIndex, 1)
  }



  //To reverse the value of the boolean
  editing(id: any, courseName: any, courseDesc: any) {
    this.currentId = id;
    this.courseName = courseName;
    this.courseDesc = courseDesc;
    this.isEditing = true;
    this.isAdding = false;
    this.isAddingInstructor = false
    this.isViewingInstructor = false
    this.isAddingStudent = false;
    this.isViewingStudent = false;

  }



  addAnInstructor(courseId?: number) {
    this.courseId = courseId;
    this.isAddingInstructor = true;
    this.isAdding = false;
    this.isEditing = false;
    this.isViewingInstructor = false;
    this.isAddingStudent = false;
    this.isViewingStudent = false;
    this.instructorDialog = true;


  }

  addAStudent(courseId?: number) {
    console.log(this.studentDialog);

    this.courseId = courseId;
    this.isAddingStudent = true;
    this.isAddingInstructor = false;
    this.isAdding = false;
    this.isEditing = false;
    this.isViewingInstructor = false;
    this.isViewingStudent = false;
    this.studentDialog = true;


  }

  viewInstructors(courseId?: number) {
    this.courseId = courseId;
    this.isViewingInstructor = true;
    this.isAddingInstructor = false;
    this.isAdding = false;
    this.isEditing = false;
    this.isAddingStudent = false;
    this.isViewingStudent = false;
    this.instructorDialog = true;



  }

  viewStudents(courseId?: number) {
    this.courseId = courseId;
    this.isViewingStudent = true;
    this.isViewingInstructor = false;
    this.isAddingInstructor = false;
    this.isAdding = false;
    this.isEditing = false;
    this.isAddingStudent = false;
    this.studentDialog = true;

  }

  logout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        this.router.navigate(['']);
      }
    });


  }

}

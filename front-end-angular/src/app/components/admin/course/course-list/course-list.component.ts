import { Component, OnInit } from '@angular/core';
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
  private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllCourses();

  }

//   addSingle() {
//     this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
//   }

// addMultiple() {
//     this.messageService.addAll([{severity:'success', summary:'Service Message', detail:'Via MessageService'},
//                                 {severity:'info', summary:'Info Message', detail:'Via MessageService'}]);
//   }

// clear() {
//     this.messageService.clear();
//   }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      courses => {
        this.courses = courses;
      }
    )
  }

  editCourse(course: Course) {
    
    this.course = {...course};
    this.courseDialog = true;
}

deleteCourse(course: Course) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + course.courseName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          // this.courses = this.courses.filter(val => val.id !== course.id);
          // this.course = {
          //   courseName: "",
          //   courseDesc: "",
          // };
          this.courseService.deleteACourse(course.id).subscribe(
            () => {
              this.updateDeletedCourse(course)
            }
          )
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Course Deleted', life: 3000});
      }
  });
}

  deleteACourse(course: Course) {
    this.isEditing = false;
    this.isAdding = false;
    this.isAddingInstructor = false
    this.isViewingInstructor = false
    this.isAddingStudent = false;
    this.isViewingStudent = false;
    this.courseService.deleteACourse(course.id).subscribe(
      () => {
        this.updateDeletedCourse(course)
      }
    )

  }


  //Update Display 
  updateAddedCourses(course: Course) {
    this.getAllCourses();

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

  adding() {
    this.isAdding = !this.isAdding;
    this.isEditing = false;
    this.isAddingInstructor = false;
    this.isViewingInstructor = false;
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


  }

  addAStudent(courseId?: number){
    this.courseId = courseId;
    this.isAddingStudent = true;
    this.isAddingInstructor = false;
    this.isAdding = false;
    this.isEditing = false;
    this.isViewingInstructor = false;
    this.isViewingStudent = false;


  }

  viewInstructors(courseId?: number){
    this.courseId = courseId;
    this.isViewingInstructor = true;
    this.isAddingInstructor = false;
    this.isAdding = false;
    this.isEditing = false;
    this.isAddingStudent = false;
    this.isViewingStudent = false;



  }

  viewStudents(courseId?: number){
    this.courseId = courseId;
    this.isViewingStudent = true;
    this.isViewingInstructor = false;
    this.isAddingInstructor = false;
    this.isAdding = false;
    this.isEditing = false;
    this.isAddingStudent = false;

  }

}

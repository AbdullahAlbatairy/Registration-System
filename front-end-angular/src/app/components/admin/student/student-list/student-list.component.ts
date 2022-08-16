import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Student } from 'src/app/models/student.model';
import { AdminStudentService } from 'src/app/services/admin/student/student.service';

@Component({
  selector: 'app-admin-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class AdminStudentListComponent implements OnInit {

  students: Student[];
  studentDialog: boolean;

  isAdding = false;
  isEditing = false;


  //data binding
  student = new Student;
  constructor(private studentService: AdminStudentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.listStudents();
  }

  listStudents() {
    this.studentService.getAllStudent().subscribe(
      data => {
        this.students = data;
      }
    )
  }

  addingStudent() {
    this.isAdding = true;
    this.isEditing = false;
    this.studentDialog = true;
  }

  editingStudent(student: Student) {
    this.isEditing = true;
    this.isAdding = false;
    this.student = { ...student }
    this.studentDialog = true;

  }

  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + student.firstName + ' ' + student.lastName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.studentService.deleteAStudent(student.id).subscribe(
          () => {
            this.updateDeletedStudent(student)
          }
        )
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Deleted', life: 3000 });
      }
    });
  }

  // deleteAStudent(student: Student) {
  //   this.isEditing = false;
  //   this.isAdding = false;
  //   this.studentService.deleteAStudent(student.id).subscribe(
  //     () => {
  //       this.updateDeletedStudent(student)
  //     }
  //   )
  // }

  updateAddedStudents() {
    this.listStudents();
  }

  updateEditedStudent(editedStudent: Student) {
    var foundIndex = this.students.findIndex(student => student.id == editedStudent.id)
    this.students[foundIndex].firstName = editedStudent.firstName
    this.students[foundIndex].lastName = editedStudent.lastName
    this.students[foundIndex].email = editedStudent.email
    this.students[foundIndex].password = editedStudent.password
    this.students[foundIndex].courses = editedStudent.courses
  }
  updateDeletedStudent(deletedStudent: Student) {
    var foundIndex = this.students.findIndex(student => student.id == deletedStudent.id)
    this.students.splice(foundIndex, 1)
  }


  editing(student: Student) {
    this.student.id = student.id;
    this.student.email = student.email;
    this.student.firstName = student.firstName;
    this.student.lastName = student.lastName;
    this.student.password = student.password;
    this.student.courses = student.courses;

    this.isEditing = true;
    this.isAdding = false;

  }


  adding() {
    this.isAdding = !this.isAdding;
    this.isEditing = false;
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

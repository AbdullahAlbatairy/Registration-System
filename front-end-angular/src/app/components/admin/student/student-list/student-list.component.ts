import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { Student } from 'src/app/models/student.model';
import { AdminStudentService } from 'src/app/services/admin/student/student.service';

@Component({
  selector: 'app-admin-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class AdminStudentListComponent implements OnInit {

  students: Student[];

  isAdding = false;
  isEditing = false;


  //data binding
  student = new Student;
  constructor(private studentService: AdminStudentService) { }

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

  deleteAStudent(student: Student) {
    this.isEditing = false;
    this.isAdding = false;
    this.studentService.deleteAStudent(student.id).subscribe(
      () => {
        this.updateDeletedStudent(student)
      }
    )
  }

  updateAddedStudents(student: Student) {
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


}

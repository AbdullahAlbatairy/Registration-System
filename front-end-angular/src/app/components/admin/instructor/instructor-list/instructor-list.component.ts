import { Component, OnInit } from '@angular/core';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminInstructorService } from 'src/app/services/admin/instructor/instructor.service';

@Component({
  selector: 'app-admin-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class AdminInstructorListComponent implements OnInit {

  instructors: Instructor[];

  isAdding = false;
  isEditing = false;

  //data binding
  instructor = new Instructor;
  constructor(private instructorService: AdminInstructorService) { }

  ngOnInit(): void {
    this.getAllInstructors();

  }

  getAllInstructors() {
    this.instructorService.getAllInstructor().subscribe(
      instructors => {
        this.instructors = instructors;
      }
    )
  }

  deleteAnInstructor(instructor: Instructor) {
    this.isEditing = false;
    this.isAdding = false;
    this.instructorService.deleteAnInstructor(instructor.id).subscribe(
      () => {
        this.updateDeletedInstructor(instructor)
      }
    )
  }

  updateAddedInstructors(instructor: Instructor) {
    this.getAllInstructors();
  }

  updateEditedInstructor(editedInstructor: Instructor) {
    var foundIndex = this.instructors.findIndex(instructor => instructor.id == editedInstructor.id)
    this.instructors[foundIndex].firstName = editedInstructor.firstName
    this.instructors[foundIndex].lastName = editedInstructor.lastName
    this.instructors[foundIndex].email = editedInstructor.email
    this.instructors[foundIndex].password = editedInstructor.password
    this.instructors[foundIndex].courses = editedInstructor.courses
  }

  updateDeletedInstructor(deletedInstructor: Instructor) {
    var foundIndex = this.instructors.findIndex(instructor => instructor.id == deletedInstructor.id);
    this.instructors.splice(foundIndex, 1)

  }

  editing(instructor: Instructor) {
    this.instructor.id = instructor.id;
    this.instructor.email = instructor.email;
    this.instructor.firstName = instructor.firstName;
    this.instructor.lastName = instructor.lastName;
    this.instructor.password = instructor.password;
    this.instructor.courses = instructor.courses;

    this.isEditing = true;
    this.isAdding = false;

  }

  adding() {
    this.isAdding = !this.isAdding;
    this.isEditing = false;
  }



}

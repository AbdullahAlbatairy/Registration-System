import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminInstructorService } from 'src/app/services/admin/instructor/instructor.service';

@Component({
  selector: 'app-admin-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class AdminInstructorListComponent implements OnInit {

  instructors: Instructor[];
  instructor: Instructor;
  instructorDialog = false;

  isAdding = false;
  isEditing = false;

  //data binding
  // instructor = new Instructor;
  constructor(private instructorService: AdminInstructorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

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

  editingInstructor(instructor: Instructor) {
    this.isEditing = true;
    this.isAdding = false;
    this.instructor = { ...instructor }
    this.instructorDialog = true;

  }

  deleteInstructor(instructor: Instructor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + instructor.firstName + ' ' + instructor.lastName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.instructorService.deleteAnInstructor(instructor.id).subscribe(
          () => {
            this.updateDeletedInstructor(instructor)
          }
        )
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instructor Deleted', life: 3000 });
      }
    });
  }

  // deleteAnInstructor(instructor: Instructor) {
  //   this.isEditing = false;
  //   this.isAdding = false;
  //   this.instructorService.deleteAnInstructor(instructor.id).subscribe(
  //     () => {
  //       this.updateDeletedInstructor(instructor)
  //     }
  //   )
  // }

  updateAddedInstructors() {
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



  addingInstructor() {
    this.isAdding = true;
    this.isEditing = false;
    this.instructorDialog = true;
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

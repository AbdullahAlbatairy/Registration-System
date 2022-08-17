import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Course } from 'src/app/models/course.model';
import { Instructor } from 'src/app/models/instructor.model';
import { AdminInstructorService } from 'src/app/services/admin/instructor/instructor.service';

@Component({
  selector: 'app-admin-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.css']
})
export class AdminInstructorEditComponent implements OnInit {
  @Input() instructor: Instructor;
  submitted: boolean;
  @Input() instructorDialog: boolean;
  @Output() cancelInstructor = new EventEmitter;


  @Output() editedInstructorInfo = new EventEmitter<Instructor>;
  editInstructor: FormGroup;
  constructor(private instructorService: AdminInstructorService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.editInstructor = new FormGroup({
      "email": new FormControl(this.instructor.email, [Validators.required, Validators.email]),
      "firstName": new FormControl(this.instructor.firstName, Validators.required),
      "lastName": new FormControl(this.instructor.lastName, Validators.required),

    })
  }

  onEditingInstructor() {

    this.instructor.email = this.editInstructor.value.email,
      this.instructor.firstName = this.editInstructor.value.firstName,
      this.instructor.lastName = this.editInstructor.value.lastName,



      this.instructorService.editAnInstructor(this.instructor).subscribe(
        () => {
          this.editedInstructorInfo.emit(this.instructor);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Instructor Has been Edited', life: 3000 });

        }
      )
  }
  hideDialog() {
    this.instructorDialog = false;
    this.submitted = false;
    this.cancelInstructor.emit();
  }

}

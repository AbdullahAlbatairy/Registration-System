import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-instructor-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class InstructorStudentListComponent implements OnInit {
  @Input() students: Student[];
  @Input() studentDialog: boolean;
  @Output() closeStudent = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  hideDialog() {
    this.closeStudent.emit()
  }

}

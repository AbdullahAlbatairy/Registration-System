import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCourseListComponent } from './components/admin/course/course-list/course-list.component';
import { AdminInstructorListComponent } from './components/admin/instructor/instructor-list/instructor-list.component';
import { AdminStudentListComponent } from './components/admin/student/student-list/student-list.component';

const routes: Routes = [
  { path: '', component: AdminCourseListComponent },
  { path: 'admin-students-list', component: AdminStudentListComponent },
  { path: 'admin-instructors-list', component: AdminInstructorListComponent },
  { path: 'admin-courses-list', component: AdminCourseListComponent, },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

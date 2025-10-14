import { Component } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [TaskFormComponent, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container mt-4">
      <h1>Add New Task</h1>
      <app-task-form></app-task-form>
    </div>
  `,
  styles: []
})
export class AddTaskComponent {}
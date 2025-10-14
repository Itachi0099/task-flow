import { Component } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskListComponent, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container mt-4">
      <h1>Task Dashboard</h1>
      <app-task-list></app-task-list>
    </div>
  `,
  styles: []
})
export class HomeComponent {}
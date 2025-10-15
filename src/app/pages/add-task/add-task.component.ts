import { Component } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [TaskFormComponent, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container mt-4">
      <h1>Add New Task</h1>
      <app-task-form (save)="saveTask($event)" (cancel)="cancelTask()"></app-task-form>
    </div>
  `,
  styles: []
})
export class AddTaskComponent {
  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}
  
  saveTask(task: Task): void {
    this.taskService.addTask(task).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Error creating task:', err);
        alert('Failed to create task. Please try again.');
      }
    });
  }
  
  cancelTask(): void {
    this.router.navigate(['/tasks']);
  }
}
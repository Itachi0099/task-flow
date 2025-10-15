import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [TaskFormComponent, NavbarComponent, CommonModule],
  template: `
    <app-navbar></app-navbar>
    <div class="container mt-4">
      <h1>Edit Task</h1>
      <app-task-form *ngIf="task" [task]="task" [isEditMode]="true"></app-task-form>
      <div *ngIf="!task" class="alert alert-info">Loading task...</div>
    </div>
  `,
  styles: []
})
export class EditTaskComponent implements OnInit {
  task: Task | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTask(id).subscribe(task => {
        this.task = task;
      });
    }
  }
}
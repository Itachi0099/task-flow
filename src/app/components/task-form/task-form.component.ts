import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styles: []
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task = {
    title: '',
    description: '',
    status: 'pending'
  };
  @Input() isEditMode: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEditMode = true;
      this.loadTask(parseInt(taskId));
    }
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task = task;
      },
      error: (error) => {
        console.error('Error loading task:', error);
        alert('Error loading task details');
      }
    });
  }

  onSubmit(): void {
    if (!this.task.title.trim()) {
      alert('Title is required');
      return;
    }

    this.isSubmitting = true;

    const operation = this.isEditMode 
      ? this.taskService.updateTask(this.task)
      : this.taskService.addTask(this.task);

    operation.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Error saving task:', error);
        this.isSubmitting = false;
        alert('Error saving task');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
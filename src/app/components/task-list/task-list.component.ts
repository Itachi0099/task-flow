import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

// Helper functions for templates
function countCompleted(tasks: Task[]): number {
  return tasks.filter(t => t.status === 'completed').length;
}

function countPending(tasks: Task[]): number {
  return tasks.filter(t => t.status === 'pending').length;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      }
    });
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== id);
        },
        error: (error) => console.error('Error deleting task:', error)
      });
    }
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask: Task = {
      ...task,
      status: task.status === 'pending' ? 'completed' : 'pending'
    };
    
    this.taskService.updateTask(updatedTask).subscribe({
      next: (result) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = result;
        }
      },
      error: (error) => console.error('Error updating task:', error)
    });
  }

  getStatusBadgeClass(status: string): string {
    return status === 'completed' ? 'bg-success' : 'bg-warning';
  }
}
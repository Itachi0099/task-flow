import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = null;
    
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        // Process tasks to handle new properties
        this.tasks = tasks.map(task => {
          // Convert tags string to array if it exists
          if (task.tags && typeof task.tags === 'string' && !task.tagList) {
            task.tagList = task.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
          }
          
          // Ensure priority is set
          if (!task.priority) {
            task.priority = 'medium';
          }
          
          return task;
        });
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.error = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
      }
    });
  }

  deleteTask(task: Task): void {
    if (!confirm(`Are you sure you want to delete "${task.title}"?`)) {
      return;
    }
    
    if (!task.id) {
      console.error('Cannot delete task without ID');
      alert('Failed to delete task. Missing task ID.');
      return;
    }
    
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: (err) => {
        console.error('Error deleting task:', err);
        alert('Failed to delete task. Please try again.');
      }
    });
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask: Task = {
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed',
      updatedAt: new Date()
    };
    
    this.taskService.updateTask(updatedTask).subscribe({
      next: () => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (err) => {
        console.error('Error updating task status:', err);
        alert('Failed to update task status. Please try again.');
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    return status === 'completed' ? 'bg-success' : 'bg-warning';
  }
  
  // Helper methods for task properties
  getPriorityBadgeClass(priority: string | undefined): string {
    if (!priority) return 'bg-secondary';
    
    switch (priority) {
      case 'high': return 'bg-danger';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-info';
      default: return 'bg-secondary';
    }
  }
}
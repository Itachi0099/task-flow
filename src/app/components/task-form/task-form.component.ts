import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border-color: #dc3545;
    }
    
    .ng-valid.ng-dirty:not(form) {
      border-color: #198754;
    }
  `]
})
export class TaskFormComponent {
  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    category: '',
    dueDate: null,
    tags: '',
    reminder: false,
    recurring: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  @Input() isEditMode = false;
  @ViewChild('taskForm') taskForm!: NgForm;
  
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();
  
  isSubmitting = false;
  showDebug = false; // Set to true during development to see form state
  
  onSubmit(): void {
    if (this.taskForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.controls[key];
        control.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    
    // Process tags if provided (convert comma-separated string to array)
    if (this.task.tags && typeof this.task.tags === 'string') {
      this.task.tagList = this.task.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    
    // Update timestamps
    if (!this.isEditMode) {
      this.task.createdAt = new Date();
    }
    this.task.updatedAt = new Date();
    
    // Emit the task to be saved
    setTimeout(() => {
      this.save.emit(this.task);
      this.isSubmitting = false;
    }, 600); // Simulate API delay
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
  
  // Helper method to reset the form
  resetForm(): void {
    if (this.taskForm) {
      this.taskForm.resetForm();
      
      // Reset to default values
      this.task = {
        id: '',
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        category: '',
        dueDate: null,
        tags: '',
        reminder: false,
        recurring: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }
}
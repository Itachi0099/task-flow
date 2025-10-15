import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    // Create a clean task object without undefined or circular references
    const cleanTask = {
      ...task,
      // Don't include id for new tasks, let the server generate it
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Remove id for new tasks to let JSON Server auto-generate it
    delete cleanTask.id;
    
    // Remove any properties that might cause issues
    delete cleanTask.tagList; // We'll use the tags string instead
    
    return this.http.post<Task>(this.apiUrl, cleanTask);
  }

  updateTask(task: Task): Observable<Task> {
    // Create a clean task object without undefined or circular references
    const cleanTask = {
      ...task,
      updatedAt: new Date().toISOString()
    };
    
    // Remove any properties that might cause issues
    delete cleanTask.tagList; // We'll use the tags string instead
    
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, cleanTask);
  }

  deleteTask(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
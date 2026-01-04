import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Task {
  id?: number;
  title?: string;
  description?: string;
  done?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {

  private STORAGE_KEY = 'tasks';

  getTasks(): Observable<Task[]> {
    return of(this.getFromStorage());
  }

  getTaskById(id: number): Observable<Task | undefined> {
    const task = this.getFromStorage().find(t => t.id === id);
    return of(task);
  }

  addTask(title:string, description:string): Observable<Task[]> {
    const tasks = this.getFromStorage();

    const newTask: Task = {
      id:Date.now(),
      title: title,
      description:  description,
      done: false
    };

    tasks.push(newTask);
    console.log('Adding task:', newTask);
    this.saveToStorage(tasks);

    return of(tasks);
  }

  removeTask(id: number): Observable<Task[]> {
    let tasks = this.getFromStorage();
    tasks = tasks.filter(t => t.id !== id);
    this.saveToStorage(tasks);
    return of(tasks);
  }

  toggleTaskDone(id: number): Observable<Task[]> {
    const tasks = this.getFromStorage();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex].done = !tasks[taskIndex].done;
      this.saveToStorage(tasks);
    }
    return of(tasks);
  }

  editTask(id: number, newTitle: string, desc: string): Observable<Task[]> {
    const tasks = this.getFromStorage();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex].title = newTitle;
      tasks[taskIndex].description = desc;
      this.saveToStorage(tasks);
    }

    console.log(tasks[taskIndex]);
    return of(tasks);   
  }




  private getFromStorage(): Task[] {
    
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private saveToStorage(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Task {
  id?: number;
  title?: string;
  description?: string;
  done?: boolean;
}


/**
 * Service responsible for managing tasks using localStorage.
 */
@Injectable({ providedIn: 'root' })
export class TaskService {

  private STORAGE_KEY = 'tasks';

  /**
   * Returns all tasks from localStorage.
   * @returns Observable of task array
   */
  getTasks(): Observable<Task[]> {
    return of(this.getFromStorage());
  }

  /**
   * Returns a task by its id.
   * @param id Task identifier
   * @returns Observable of task or undefined
   */
  getTaskById(id: number): Observable<Task | undefined> {
    const task = this.getFromStorage().find(t => t.id === id);
    return of(task);
  }

  /**
   * Adds a new task.
   * @param title Task title
   * @param description Task description
   * @returns Updated task list
   */
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

  /**
   * Removes a task.
   * @param id Task identifier
   * @returns Updated task list
   */
  removeTask(id: number): Observable<Task[]> {
    let tasks = this.getFromStorage();
    tasks = tasks.filter(t => t.id !== id);
    this.saveToStorage(tasks);
    return of(tasks);
  }

  /**
   * Toggles the done status of a task.
   * @param id Task identifier
   * @returns Updated task list
   */
  toggleTaskDone(id: number): Observable<Task[]> {
    const tasks = this.getFromStorage();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex].done = !tasks[taskIndex].done;
      this.saveToStorage(tasks);
    }
    return of(tasks);
  }

  /**
   * Updates a task.
   * @param id Task identifier
   * @param title Task title
   * @param description Task description
   * @returns Updated task list
   */

  editTask(id: number, newTitle: string, desc: string): Observable<Task[]> {
    const tasks = this.getFromStorage();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex].title = newTitle;
      tasks[taskIndex].description = desc;
      this.saveToStorage(tasks);
    }

    return of(tasks);   
  }



  /**
   * Retrieves tasks from localStorage.
   * @returns Task array
   */
  private getFromStorage(): Task[] {
    
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  /**
   * Saves tasks to localStorage.
   * @param tasks Task array
   */
  private saveToStorage(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }
}

import { Component } from '@angular/core';
import { Task, TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';

/**
 * Component to display the list of tasks and provide actions for managing them.
 */
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: false,
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  /**
   * Array of tasks displayed in the UI.
   */
  tasks : Task[] = [];

  constructor(private TaskService: TaskService, private router: Router) {}

  /**
   * Initializes the component by loading tasks from the TaskService.
   */
  ngOnInit(): void {
    this.TaskService.getTasks().subscribe(tasks => this.tasks = tasks)
  }

  /**
   * Removes a task by its id.
   * @param id Task identifier
   */
  removeTasks(id?: number): void {
    this.TaskService.removeTask(id!).subscribe(tasks => this.tasks = tasks);
  }

  /**
   * Toggles the done status of a task.
   * @param id Task id
   */
  toggleTodo(id?: number): void {
    this.TaskService.toggleTaskDone(id!).subscribe(tasks => this.tasks = tasks);
  }

  /**
   * Navigates to the edit page for a task.
   * @param id Task identifier
   */
  openEditPage(id?: number): void {
    this.router.navigate(["edit", id]);
  }
  
  /**
   * Edits a task.
   * @param id Task identifier
   * @param newTitle New title for the task
   * @param desc New description for the task
   */
  editTask(id?: number, newTitle?: string, desc?: string): void {
    this.TaskService.editTask(id!, newTitle!, desc!).subscribe(tasks => this.tasks = tasks);
  }

}

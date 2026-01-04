import { Component } from '@angular/core';
import { Task, TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: false,
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  tasks : Task[] = [];

  constructor(private TaskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.TaskService.getTasks().subscribe(tasks => this.tasks = tasks)
  }

  removeTasks(id?: number): void {
    this.TaskService.removeTask(id!).subscribe(tasks => this.tasks = tasks);
  }

  toggleTodo(id?: number): void {
    this.TaskService.toggleTaskDone(id!).subscribe(tasks => this.tasks = tasks);
  }

  openEditPage(id?: number): void {
    this.router.navigate(["edit", id]);
  }

  editTask(id?: number, newTitle?: string, desc?: string): void {
    this.TaskService.editTask(id!, newTitle!, desc!).subscribe(tasks => this.tasks = tasks);
  }

}

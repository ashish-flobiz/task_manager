import { Component } from '@angular/core';
import { Task, TaskService } from '../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 * Component for adding or editing a task.
 */
@Component({
  selector: 'app-upsert-task',
  templateUrl: './upsert-task.component.html',
  standalone: false,
  styleUrls: ['./upsert-task.component.css']
})
export class UpsertTaskComponent {
  constructor(private TaskService: TaskService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService){}

  /**
   * The task being added or edited.
   */
  task: Task = {
    id: 0,
    title: '',
    description: '',
    done: false
  };
  isEditMode: boolean = false;

  /**
   * Initializes the component, checking if it's in edit mode.
   * Fetches the task details if an ID is provided in the route parameters.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.loadTask(+id);
    }

  }

  /**
   * Loads a task by its ID.
   * @param id Task identifier
   */

  loadTask(id: number): void {
  this.TaskService.getTaskById(id).subscribe(task => {
    if (task) {
      this.task = { ...task };
    }
  });
}

/**   
 * Saves the task, either adding a new one or updating an existing one.
*/
saveTask(): void {
    if (this.isEditMode) {
      this.TaskService.editTask(this.task.id!, this.task.title!, this.task.description!).subscribe({
        next: () => {
          this.toastr.success('Task updated successfully');
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.toastr.error('Failed to update task');
        }
      });
    } else {
      this.TaskService.addTask(this.task.title!, this.task.description!).subscribe({
        next: () => {
          this.toastr.success('Task added successfully');
          this.router.navigate(['/tasks']);
        },
        error: () => {
          this.toastr.error('Failed to add task');
        }
      });
    }

    this.router.navigate(['/task']);
  }

  /**
   * Adds a new task.
   * @param titleInput 
   * @param descriptionInput 
   */
  addTask(titleInput: string, descriptionInput: string): void {
    this.TaskService.addTask(titleInput, descriptionInput).subscribe();
  }
}

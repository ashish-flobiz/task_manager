import { Component } from '@angular/core';
import { Task, TaskService } from '../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upsert-task',
  templateUrl: './upsert-task.component.html',
  standalone: false,
  styleUrls: ['./upsert-task.component.css']
})
export class UpsertTaskComponent {
  constructor(private TaskService: TaskService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService){}

  task: Task = {
    id: 0,
    title: '',
    description: '',
    done: false
  };
  isEditMode: boolean = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.loadTask(+id);
    }

  }

  loadTask(id: number): void {
  this.TaskService.getTaskById(id).subscribe(task => {
    if (task) {
      this.task = { ...task };
    }
  });
}

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

  addTask(titleInput: string, descriptionInput: string): void {
    this.TaskService.addTask(titleInput, descriptionInput).subscribe();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './list/task-list.component';
import { UpsertTaskComponent } from './upsert/upsert-task.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TaskListComponent, UpsertTaskComponent],
  imports: [CommonModule, FormsModule, TasksRoutingModule, SharedModule],
  providers: []
})
export class TasksModule {}

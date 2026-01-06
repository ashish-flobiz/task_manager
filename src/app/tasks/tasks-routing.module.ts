import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './list/task-list.component';
import { UpsertTaskComponent } from './upsert/upsert-task.component';
import { AuthGuard } from '../auth/auth.guard';

/**
 * Routing module for task-related routes.
 */
const routes: Routes = [
  { path: '', component: TaskListComponent,  canActivate: [AuthGuard] },
  { path: 'add', component: UpsertTaskComponent ,  canActivate: [AuthGuard]},
  { path: 'edit/:id', component: UpsertTaskComponent ,  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}

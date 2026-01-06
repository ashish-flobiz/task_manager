import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar {

  constructor(private router: Router) {}
  openCreatePage(id?: number): void {
    this.router.navigate(["add"]);
  }
  openTaskPage(id?: number): void {
    this.router.navigate(["task"]);
  }
}

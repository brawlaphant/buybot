import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ecoActions = [
    "Use a reusable water bottle",
    "Turn off lights when not in use",
    "Use cloth bags for shopping",
    "Compost food scraps",
    "Choose products with minimal packaging"
  ];

  newAction = '';

  addAction() {
    if (this.newAction.trim()) {
      this.ecoActions.push(this.newAction.trim());
      this.newAction = '';
    }
  }
}
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { UsersService } from '../users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  data: any[] = [];
  selectedUser: any = null;

  constructor(private users: UsersService) {}
// Getting the data form json
  ngOnInit(): void {
    this.users.getData().subscribe((response) => {
      this.data = response.data.members;

      
    });
    console.log(this.data)
  }

  openPopUp(user: any): void {
    this.selectedUser = { ...user }; // Create a copy to avoid directly modifying the original data
  }

  saveChanges(): void {
    const userIndex = this.data.findIndex(
      (item) => item.user.userId === this.selectedUser.userId
    );
    if (userIndex !== -1) {
      this.data[userIndex].user = { ...this.selectedUser };
      alert('User details updated successfully!');
    }
  }
}

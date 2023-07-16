import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserRequest } from 'src/app/Shared_Classes_and_types/IUserRequest';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserRequsetMediaService } from 'src/app/services/user-requset-media.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent {
  isLoggedIn: boolean = false;
  userIdFromStorage = localStorage.getItem('userId');
  userRequests: IUserRequest[] = [];


  uRequestForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(6)]],
    topic: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private userRequsetMediaService: UserRequsetMediaService, private router: Router, private alertifyService: AlertifyService) { }


  ngOnInit() {
    this.userRequsetMediaService.getUserRequset(this.userIdFromStorage).subscribe({
      next: data => {
        console.log(data)
        this.userRequests = data;
      },
      error: error => console.log(error)
    })


  }

  onSubmint() {
    const newReq = {
      userId: this.userIdFromStorage,
      title: this.uRequestForm.value.title,
      topic: this.uRequestForm.value.topic,
    }

    this.userRequsetMediaService.sendUserRequest(newReq).subscribe({
      next: data => {
        //add new req in array
        this.userRequests.push(data.newRequestObj)
        // Clear the form values
        this.uRequestForm.reset();
        // Display a success message
        this.alertifyService.success('Request submitted successfully.');
      },
      error: error => {
        console.log(error)
        this.alertifyService.error('Failed to submit request.');
      }
    })




  }

}

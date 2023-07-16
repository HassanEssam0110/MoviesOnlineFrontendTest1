import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/Shared_Classes_and_types/custom validtions/confirmPassword.validator';
import { ForviddenNameValidator } from 'src/app/Shared_Classes_and_types/custom validtions/userName.validator';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), ForviddenNameValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  }, {
    validator: [confirmPasswordValidator]
  })

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit(): void {

  }

  onSubmint() {
    console.log(this.registrationForm.value)
    this.authService.enroll(this.registrationForm.value).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(['/auth/login']); // redirect the user to the home page
        this.alertifyService.success(data.message)
      },
      error: error => {
        this.alertifyService.error(error.error.message)
        console.log(error)
      }
    })
  }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/Shared_Classes_and_types/user/UserLogin';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  rememberMe: boolean = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  })

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router, private alertifyService: AlertifyService) { }



  ngOnInit() {
    const rememberMeValue = localStorage.getItem('rememberMe');
    this.rememberMe = rememberMeValue ? JSON.parse(rememberMeValue) : false;
    if (this.rememberMe === true) {
      this.loginForm.setValue({
        email: localStorage.getItem('userEmail'),
        password: localStorage.getItem('userPassword')?.replace(/"/g, '') || ' ',
        rememberMe: true
      })
    }
  }


  onSubmint() {
    const { email, password, rememberMe } = this.loginForm.value;

    if (rememberMe) {
      localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
      localStorage.setItem('userPassword', JSON.stringify(password));
    } else {
      localStorage.setItem('userPassword', '');
      localStorage.setItem('rememberMe', 'false');
    }


    const userLogin: UserLogin = {
      email: email || '', // provide an empty string as default value
      password: password || '' // provide an empty string as default value
    };

    this.authService.login(userLogin).subscribe({
      next: data => {
        this.isLoggedIn = true
        this.authService.setIsLoggedIn(this.isLoggedIn);
        this.alertifyService.success('Welcome ' + data.userData.userName)

        // Save the user data in the localStorage
        localStorage.setItem('userId', JSON.stringify(data.userData.userId).replace(/"/g, ''));
        localStorage.setItem('userName', JSON.stringify(data.userData.userName).replace(/"/g, ''));
        localStorage.setItem('userRole', JSON.stringify(data.userData.userRole).replace(/"/g, ''));
        localStorage.setItem('userEmail', JSON.stringify(data.userData.userEmail).replace(/"/g, ''));
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));

        if (data.userData.userRole == 'admin') {
          this.alertifyService.message("admin log")
          this.router.navigate(['/admin/ad']); // redirect the user to the admin page
        } else {
          this.router.navigate(['/about']); // redirect the user to the home page
        }
      },
      error: error => {
        this.alertifyService.error('Incorrect Username or Password');
        console.log(error)
      }
    })
  }

}

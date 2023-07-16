import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/Shared_Classes_and_types/IMovie';
import { AllMediaService } from 'src/app/services/Media/all-media.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  userName: string = "";
  searchFounded: IMovie[];

  searchForm = this.fb.group({
    searchName: ['', [Validators.required]],
  })


  constructor(private authService: AuthServiceService, private router: Router,
    private alertifyService: AlertifyService, private fb: FormBuilder,
    private allMediaService: AllMediaService) { }


  ngOnInit() {
    this.isLoggedIn = this.authService.getIsLoggedIn();

  }

  logedin() {
    const token = localStorage.getItem('token');
    var user_name = localStorage.getItem('userName') as string;
    this.userName = user_name?.replaceAll('"', " ");
    return !token;
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.setIsLoggedIn(this.isLoggedIn)
    this.alertifyService.warning('User logout')
    //clear localStorage
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));

    this.router.navigate(['/']);
  }
  search() {
    console.log(this.searchForm.value)
    const searchName = this.searchForm.value.searchName || '';
    this.allMediaService.searchByName(searchName).subscribe({
      next: data => {
        console.log(data)
        this.searchFounded = data;
        this.allMediaService.setSearchMovieList(this.searchFounded);
        this.router.navigate(['/search']); // redirect the user to the home page
        if (this.searchFounded.length <= 0) {
          this.alertifyService.error('Sorry, not found.');
        }
      }, error: error => {
        console.log(error);
      }
    })
  }

}

import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AllMediaService } from 'src/app/services/Media/all-media.service';
import { UserFavoritesService } from 'src/app/services/Media/user-favorites.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss']
})
export class UserFavoriteComponent {
  selectedId: any;
  favoriteMediaList: any;
  mediasPerPage = 6;
  currentPage = 1;
  imageUrl: SafeResourceUrl = '';
  userloged: boolean;
  token = localStorage.getItem('token')
  userId = localStorage.getItem('userId')


  constructor(private route: Router, private authServiceService: AuthServiceService, private activatedRoute: ActivatedRoute, private userFavoritesService: UserFavoritesService, private alertifyService: AlertifyService, private sanitizer: DomSanitizer) {
  }


  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.userloged = isLoggedIn ? JSON.parse(isLoggedIn) : false;
    if (this.token) {
      this.userFavoritesService.getFavoriteMovies(this.userId).subscribe({
        next: data => {
          console.log(data)
          this.favoriteMediaList = data
          this.alertifyService.success("Done data")
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }

  getSafeImage(imgUrl: any) {
    return this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  goToMovieDetails(id: any) {
    this.route.navigate(['/watch', id]) //=> to force tacke id
  }

  loadMore() {
    this.currentPage++;
  }

  modalOpen = false;
  safeUrl: SafeResourceUrl = '';
  isLoading = false;
  openModal(urlTrailer: any): void {
    console.log(urlTrailer);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlTrailer);
    this.modalOpen = true;
    this.isLoading = true;
  }
  closeModal(): void {
    this.modalOpen = false;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }
  onIframeLoad() {
    this.isLoading = false;
  }

  removeFromFavorites(movieId: number) {
    console.log("movie id : " + movieId)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.userloged = isLoggedIn ? JSON.parse(isLoggedIn) : false;
    if (this.token) {
      console.log("user id :" + this.userId)
      //   this.userFavoritesService.removeFavoriteMovie(this.userId, movieId).subscribe({
      //     next: (data) => {
      //       // console.log(data)
      //   //  this.favoriteMediaList= data.favoritesMovie
      //       this.alertifyService.success("Movie removed from favorites.");
      //     },
      //     error: error => {
      //       this.alertifyService.error(error.message);
      //       console.log(error);
      //     }
      //   });

      // } else {
      //   console.error('User ID is null or undefined.');
      // }
      this.userFavoritesService.removeFavoriteMovie(this.userId, movieId).subscribe({
        next: () => {
          // Fetch the updated list of favorite movies
          this.userFavoritesService.getFavoriteMovies(this.userId).subscribe({
            next: (data) => {
              this.favoriteMediaList = data;
              this.alertifyService.success("Movie removed from favorites.");
            },
            error: error => {
              this.alertifyService.error(error.message);
              console.log(error);
            }
          });
        },
        error: error => {
          this.alertifyService.error(error.message);
          console.log(error);
        }
      });
    } else {
      console.error('User ID is null or undefined.');
    }
  }
}

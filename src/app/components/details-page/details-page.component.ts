import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AllMediaService } from 'src/app/services/Media/all-media.service';
import { SearchMediaByIdService } from 'src/app/services/Media/search-media-by-id.service';
import { UserFavoritesService } from 'src/app/services/Media/user-favorites.service';
import { AlertifyService } from 'src/app/services/alertify.service';
declare var Plyr: any;

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  mediaId: any;
  MediaList: any;
  mediaFounded: any;
  // mediaFounded: any[] = [];
  modalOpen = false;
  safeUrl: SafeResourceUrl = '';

  isLoading = false;
  // videoUrl: string =''
  @ViewChild('plyrPlayer', { static: true }) playerElement!: ElementRef;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private allMediaService: AllMediaService, private searchMediaByIdService: SearchMediaByIdService, private sanitizer: DomSanitizer, private alertifyService: AlertifyService, private userFavoritesService: UserFavoritesService) { }

  videoUrl: SafeResourceUrl = '';
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.mediaId = params.get("id")
    })


    this.searchMediaByIdService.SearchMediaById(this.mediaId).subscribe({
      next: data => {
        this.mediaFounded = [data];

        console.log(this.mediaFounded)
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mediaFounded[0].video);
        console.log(this.videoUrl)
        console.log(this.mediaFounded.video)
      },
      error: error => {
        console.log(error)
      }
    })


  }



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

  userId = localStorage.getItem('userId')

  addToFavorites(movieId: number) {
    // this.userFavoritesService.addFavoriteMovie(this.userId, movieId).subscribe({
    //   next: () => {
    //     this.alertifyService.success("Movie added to favorites.");
    //   },
    //   error: error => {
    //     this.alertifyService.error(error.message);
    //     console.log(error);
    //   }
    // });
    console.log("movie id : " + movieId)
    if (this.userId) {
      const userIdNumber = parseInt(this.userId);
      console.log(userIdNumber)
      this.userFavoritesService.addFavoriteMovie(this.userId, movieId).subscribe({
        next: () => {
          this.alertifyService.success("Movie added to favorites.");
        },
        error: error => {
          this.alertifyService.error(error.error.message);
          console.log(error);
        }
      });
    } else {
      console.error('User ID is null or undefined.');
    }
  }
}

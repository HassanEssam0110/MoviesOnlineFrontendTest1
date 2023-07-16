import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AllMediaService } from 'src/app/services/Media/all-media.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-all-media-home',
  templateUrl: './all-media-home.component.html',
  styleUrls: ['./all-media-home.component.scss'],
})
export class AllMediaHomeComponent {
  selectedId: any;
  // movies = [
  //   { "id": 1, "name": "test1" },
  //   { "id": 2, "name": "test2" },
  //   { "id": 3, "name": "test3" }
  // ]

  MediaList: any;
  mediasPerPage = 6;
  currentPage = 1;
  imageUrl: SafeResourceUrl = '';
  userloged: boolean;

  constructor(private route: Router, private authServiceService: AuthServiceService, private activatedRoute: ActivatedRoute, private allMediaService: AllMediaService, private alertifyService: AlertifyService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((prams: ParamMap) => {
    //   this.selectedId = prams.get('id')
    // })
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.userloged = isLoggedIn ? JSON.parse(isLoggedIn) : false;
    console.log(this.userloged)
    const token = localStorage.getItem('token')
    if (token) {
      this.allMediaService.allMedia().subscribe({
        next: data => {
          this.allMediaService.allMediaListFromService = data;
          this.MediaList = data;
          this.alertifyService.success("Done data")
        },
        error: error => {
          this.alertifyService.error(error.message)
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
}

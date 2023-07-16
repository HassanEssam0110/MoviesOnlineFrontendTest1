import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMovie } from 'src/app/Shared_Classes_and_types/IMovie';
import { AllMediaService } from 'src/app/services/Media/all-media.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchMoviesFounded: IMovie[];
  imageUrl: SafeResourceUrl = '';
  searchMovieListSubscription: Subscription;

  modalOpen = false;
  safeUrl: SafeResourceUrl = '';
  isLoading = false;

  constructor(private allMediaService: AllMediaService, private router: Router, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {
    this.searchMoviesFounded = this.allMediaService.searchMovieListFromService;
    this.searchMovieListSubscription = this.allMediaService.getSearchMovieListSubject().subscribe(
      (searchMovieList: IMovie[]) => {
        this.searchMoviesFounded = searchMovieList;
      }
    );

  }

  ngOnDestroy(): void {
    if (this.searchMovieListSubscription) {
      this.searchMovieListSubscription.unsubscribe();
    }
  }

  getSafeImage(imgUrl: any) {
    return this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(imgUrl);
  }

  goToMovieDetails(id: any) {
    this.router.navigate(['/watch', id]) //=> to force tacke id
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
}

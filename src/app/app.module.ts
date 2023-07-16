import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContentHomeComponent } from './components/content-home/content-home.component';
import { CarsuelHomeComponent } from './components/carsuel-home/carsuel-home.component';
import { AllMediaHomeComponent } from './components/all-media-home/all-media-home.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';

import { AboutComponent } from './components/about/about.component';
import { UserRequestComponent } from './components/user-request/user-request.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipeModule } from 'safe-pipe';
import { MovieArabicComponent } from './components/movie-arabic/movie-arabic.component';
import { MovieEnglishComponent } from './components/movie-english/movie-english.component';
import { SearchResultComponent } from './components/search-result/search-result.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContentHomeComponent,
    CarsuelHomeComponent,
    AllMediaHomeComponent,
    NotFoundPageComponent,
    DetailsPageComponent,

    AboutComponent,
    UserRequestComponent,
    UserFavoriteComponent,
    MovieArabicComponent,
    MovieEnglishComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SafePipeModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

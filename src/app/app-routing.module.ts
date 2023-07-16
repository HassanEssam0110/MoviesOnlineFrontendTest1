import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContentHomeComponent } from './components/content-home/content-home.component';
import { AboutComponent } from './components/about/about.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';
import { UserRequestComponent } from './components/user-request/user-request.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Catalog', component: ContentHomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'favorite', component: UserFavoriteComponent },
  { path: 'request', component: UserRequestComponent },
  { path: 'watch/:id', component: DetailsPageComponent },
  { path: 'search', component: SearchResultComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

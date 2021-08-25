import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';
import { KreditComponent } from './components/kredit/kredit.component';
import { TipRacunaComponent } from './components/tip-racuna/tip-racuna.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KlijentComponent } from './components/klijent/klijent.component';
import { AuthorComponent } from './components/core/author/author.component';


const routes: Routes = [
  { path: 'tip-racuna', component: TipRacunaComponent },
  { path: 'kredit', component: KreditComponent },
  { path: 'klijent', component: KlijentComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
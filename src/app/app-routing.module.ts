import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'admission-info',
        loadChildren: () => import('./admission-info/admission-info.module').then(mod => mod.AdmissionInfoModule)
      },
      {
        path: 'questions',
        loadChildren: () => import('./questions/questions.module').then(mod => mod.QuestionsModule)
      }
    ]
  },

  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

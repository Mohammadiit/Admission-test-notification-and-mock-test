import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthGuard} from './shared/service/security-service/auth.guard';
import {AdminGuard} from './shared/service/security-service/admin.guard';
import {StudentGuard} from './shared/service/security-service/student.guard';
import {BlankComponent} from './blank/blank.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
        loadChildren: () => import('./questions/questions.module').then(mod => mod.QuestionsModule),

      }
    ]
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
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

import { AboutComponent } from './about/about.component';
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { RegisterComponent }    from './register/register.component';
import { SetupComponent } from './setup/setup.component';
import { AuthGuard } from './auth.guard';
import { ReleaseRubricComponent } from './release-rubric/release-rubric.component';
import { ProfileComponent } from './profile/profile.component';
import { NetworkComponent } from './network/network.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'rubric', component: ReleaseRubricComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  { path: 'network', component: NetworkComponent, canActivate: [AuthGuard]},
  { path: 'setup', component: SetupComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, SetupComponent]

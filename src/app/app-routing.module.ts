import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupComponent } from './setup/setup.component';
import { AuthGuard } from './auth.guard';
import { ReleaseRubricComponent } from './release-rubric/release-rubric.component';
import { ProfileComponent } from './profile/profile.component';
import { NetworkComponent } from './network/network.component';

/**********************************************
 * @author Adam Chlebek
 * @version 1.0
 * @description Manage routes of all components
 * notifcations
 *********************************************/

/** Routes collection for all components */
const routes: Routes = [
  { path: 'rubric', component: ReleaseRubricComponent},
  { path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  { path: 'network', component: NetworkComponent},
  { path: 'setup', component: SetupComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

/**
 * Defines NgModule
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SetupComponent];

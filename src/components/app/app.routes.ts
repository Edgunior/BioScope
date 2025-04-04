import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { DetailsComponent } from '../details/details.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { TheaterComponent } from '../theater/theater.component';
import { OrderComponent } from '../order/order.component';
import { UserComponent } from '../user/user.component';
import { SearchComponent } from '../search/search.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'details/:id/order', component: OrderComponent },
    { path: 'search', component: SearchComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'theater', component: TheaterComponent},
    { path: 'user', component: UserComponent},
    { path: '**', redirectTo: ''},

];

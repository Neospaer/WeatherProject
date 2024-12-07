import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherPageComponent} from './weatherpage/weatherpage.component';
import {SettingComponent} from './setting/setting.component';
import { WeatherComponent } from './weather/weather.component';


const routes: Routes = [
  {path: '', redirectTo: '/cities', pathMatch: 'full'},
  {path: 'cities', component: WeatherPageComponent},
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then((m) => m.WeatherModule),
  },
  {path: 'setting', component: SettingComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

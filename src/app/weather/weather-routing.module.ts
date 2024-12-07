import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherComponent} from './weather.component';
import {WeatherResolver} from '../resolver/weather-resolver.resolver';


const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    resolve: {weatherData: WeatherResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {
}

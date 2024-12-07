import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from './weather.component';
import {WeatherRoutingModule} from './weather-routing.module';
import {DateFormatPipe, TimeFormatPipe} from '../pipes/date-format.pipe';

@NgModule({
  declarations: [
    WeatherComponent,
    DateFormatPipe,
    TimeFormatPipe,
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule {
}

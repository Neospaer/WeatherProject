import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WeatherResponse} from '../interface/forecast';
import {WeatherService} from '../service/weather.service';


@Injectable({
  providedIn: 'root',
})
export class WeatherResolver implements Resolve<WeatherResponse | null> {
  constructor(private weatherService: WeatherService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WeatherResponse | null> {
    const city = route.queryParams['city'];
    if (city) {
      return this.weatherService.getWeatherForecast(city);
    }
    return this.weatherService.getStoredWeather();
  }
}

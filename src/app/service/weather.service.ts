import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {WeatherResponse} from '../interface/forecast';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl: string = 'https://api.weatherapi.com/v1/forecast.json';
  private weatherSubject = new BehaviorSubject<WeatherResponse | null>(null);

  constructor(private http: HttpClient) {}

  getWeatherForecast(city: string): Observable<WeatherResponse> {
    const url = `${this.baseUrl}?q=${city}&days=7`;
    return this.http.get<WeatherResponse>(url).pipe(
      tap((data) => this.weatherSubject.next(data))
    );
  }

  getStoredWeather(): Observable<WeatherResponse | null> {
    return this.weatherSubject.asObservable();
  }
}
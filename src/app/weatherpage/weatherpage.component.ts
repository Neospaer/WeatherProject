import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../service/weather.service';
import {CityWeather, WeatherResponse} from '../interface/forecast';
import {WeatherFormatterService} from '../service/weather-settings.service';
import { SettingService } from '../service/settings.service';
@Component({
  selector: 'app-weatherPage',
  templateUrl: './weatherpage.component.html',
  styleUrls: ['./weatherpage.component.css']
})
export class WeatherPageComponent implements OnInit {
  cityWeatherList: CityWeather[] = [];
  inputCity: string = '';
  weatherData!: WeatherResponse;
  temperatureUnit: string = 'C';

  constructor(
    private readonly weatherService: WeatherService,
    private readonly router: Router,
    private readonly settingService: SettingService,
    private readonly weatherFormatter: WeatherFormatterService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.loadSavedCities();
    this.loadLastSelectedCity();
    this.loadUserSettings();
  }

  private loadSavedCities(): void {
    const savedCities = localStorage.getItem('searchedCities');
    this.cityWeatherList = savedCities ? JSON.parse(savedCities) : [];
  }

  private loadLastSelectedCity(): void {
    const lastSelectedCity = localStorage.getItem('lastSelectedCity');
    if (lastSelectedCity) {
      this.inputCity = lastSelectedCity;
      this.fetchWeather(lastSelectedCity);
    }
  }

  private loadUserSettings(): void {
    const settings = this.settingService.getSettings();
    this.temperatureUnit = settings.temperatureUnit;
  }

  fetchWeather(city: string): void {
    if (!city.trim()) return;

    this.weatherService.getWeatherForecast(city).subscribe(
      (data: WeatherResponse) => this.handleWeatherResponse(data),
      (error) => console.error('Error fetching weather data:', error)
    );

    this.inputCity = '';
  }

  private handleWeatherResponse(data: WeatherResponse): void {
    this.weatherData = data;
    this.saveCityIfNew(data);
  }

  private saveCityIfNew(data: WeatherResponse): void {
    const isCityAlreadySaved = this.cityWeatherList.some(
      (city) => city.name === data.location.name
    );

    if (!isCityAlreadySaved) {
      this.cityWeatherList.push({ name: data.location.name, weather: data });
      localStorage.setItem('searchedCities', JSON.stringify(this.cityWeatherList));
    }
  }

  onCitySelected(city: CityWeather): void {
    localStorage.setItem('lastSelectedCity', city.name);
    this.router.navigate(['/weather'], { queryParams: { city: city.name } });
  }

  getTemperatureMinDay(weather: WeatherResponse): string {
    return this.weatherFormatter.getTemperatureMin(weather, this.temperatureUnit);
  }

  getTemperatureMaxDay(weather: WeatherResponse): string {
    return this.weatherFormatter.getTemperatureMax(weather, this.temperatureUnit);
  }
}
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherService} from '../service/weather.service';
import {WeatherResponse, HourlyWeather, CurrentWeather, ForecastDay} from '../interface/forecast';
import {toZonedTime} from 'date-fns-tz';
import {WeatherFormatterService} from '../service/weather-settings.service';
import { SettingService } from '../service/settings.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
  temperatureUnit: string = 'C';
  pressureUnit: string = 'mb';
  windSpeedUnit: string = 'kph';
  weatherData!: WeatherResponse;
  filteredHours: HourlyWeather[] = [];
  currentHourStart: number = 0;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router,
    private settingService: SettingService,
    private weatherFormatter: WeatherFormatterService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.route.data.subscribe((data) => {
      this.weatherData = data['weatherData'];
      if (this.weatherData) {
        this.setupWeatherData();
      }
      this.loadSettings();
    });
  }

  private setupWeatherData(): void {
    this.calculateCurrentHourStart();
    this.filterHours();
  }

  private loadSettings(): void {
    const settings = this.settingService.getSettings();
    this.temperatureUnit = settings.temperatureUnit;
    this.pressureUnit = settings.pressureUnit;
    this.windSpeedUnit = settings.windSpeedUnit;
  }

  private calculateCurrentHourStart(): void {
    const timeZone = this.weatherData?.location?.tz_id;
    if (timeZone) {
      const currentTime = new Date();
      const zonedTime = toZonedTime(currentTime, timeZone);
      this.currentHourStart = Math.floor(zonedTime.getTime() / 3600000) * 3600;
    }
  }

  private filterHours(): void {
    const forecastDays = this.weatherData?.forecast?.forecastday ?? [];
    if (forecastDays.length === 0) return;

    const allHours = forecastDays.flatMap((day) => day.hour);

    this.filteredHours = allHours.filter((hour) => {
      const hourTime = hour.time_epoch * 1000;
      return hourTime >= this.currentHourStart * 1000 && hourTime < (this.currentHourStart + 24 * 3600) * 1000;
    });
  }

  isCurrentHour(hour: HourlyWeather): boolean {
    const start = this.currentHourStart;
    return hour.time_epoch >= start && hour.time_epoch < start + 3600;
  }

  getTemperatureMinHour(weather: WeatherResponse): string {
    return this.weatherFormatter.getTemperatureMin(weather, this.temperatureUnit);
  }

  getTemperatureMaxHour(weather: WeatherResponse): string {
    return this.weatherFormatter.getTemperatureMax(weather, this.temperatureUnit);
  }

  getTemperatureMinDay(day: ForecastDay): string {
    return this.weatherFormatter.getTemperatureMinDay(day, this.temperatureUnit);
  }

  getTemperatureMaxDay(day: ForecastDay): string {
    return this.weatherFormatter.getTemperatureMaxDay(day, this.temperatureUnit);
  }

  getTemperatureCurrent(current: CurrentWeather): string {
    return this.weatherFormatter.getTemperatureCurrent(current, this.temperatureUnit);
  }

  getWindSpeed(current: CurrentWeather): string {
    return this.weatherFormatter.getWindSpeed(current, this.windSpeedUnit);
  }

  getPressure(current: CurrentWeather): string {
    return this.weatherFormatter.getPressure(current, this.pressureUnit);
  }

  scrollLeft() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.scrollBy({left: -150, behavior: 'smooth'});
  }

  scrollRight() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.scrollBy({left: 150, behavior: 'smooth'});
  }
}
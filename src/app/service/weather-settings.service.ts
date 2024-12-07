import { Injectable } from '@angular/core';
import { WeatherResponse, CurrentWeather, ForecastDay } from '../interface/forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherFormatterService {
  constructor() {}

  getTemperatureMin(weather: WeatherResponse, temperatureUnit: string): string {
    if (temperatureUnit === 'C') {
      return `${weather.forecast.forecastday[0].day.mintemp_c} °C`;
    } else {
      return `${weather.forecast.forecastday[0].day.mintemp_f} °F`;
    }
  }

  getTemperatureMax(weather: WeatherResponse, temperatureUnit: string): string {
    if (temperatureUnit === 'C') {
      return `${weather.forecast.forecastday[0].day.maxtemp_c} °C`;
    } else {
      return `${weather.forecast.forecastday[0].day.maxtemp_f} °F`;
    }
  }

  getTemperatureMinDay(day: ForecastDay, temperatureUnit: string): string {
    if (temperatureUnit === 'C') {
      return `${day.day.mintemp_c} °C`;
    } else {
      return `${day.day.mintemp_f} °F`;
    }
  }

  getTemperatureMaxDay(day: ForecastDay, temperatureUnit: string): string {
    if (temperatureUnit === 'C') {
      return `${day.day.maxtemp_c} °C`;
    } else {
      return `${day.day.maxtemp_f} °F`;
    }
  }

  getTemperatureCurrent(current: CurrentWeather, temperatureUnit: string): string {
    if (temperatureUnit === 'C') {
      return `${current.temp_c} °C`;
    } else {
      return `${current.temp_f} °F`;
    }
  }

  getWindSpeed(current: CurrentWeather, windSpeedUnit: string): string {
    if (windSpeedUnit === 'kph') {
      return `${current.wind_kph} km/h`;
    } else {
      return `${current.wind_mph} mp/h`;
    }
  }

  getPressure(current: CurrentWeather, pressureUnit: string): string {
    if (pressureUnit === 'mb') {
      return `${current.pressure_mb} mbar`;
    } else {
      return `${current.pressure_in} in`;
    }
  }
}
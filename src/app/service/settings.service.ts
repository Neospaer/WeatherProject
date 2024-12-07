import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private settingsKey = 'weatherSettings';

  constructor() {
    const savedSettings = localStorage.getItem(this.settingsKey);
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }

  private settings = {
    temperatureUnit: 'C',
    pressureUnit: 'mb',
    windSpeedUnit: 'kph'
  };

  getSettings() {
    return this.settings;
  }

  updateSettings(newSettings: Partial<typeof this.settings>) {
    this.settings = {...this.settings, ...newSettings};
    localStorage.setItem(this.settingsKey, JSON.stringify(this.settings));
  }
}
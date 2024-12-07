import {Component} from '@angular/core';
import { SettingService } from '../service/settings.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  
  temperatureUnit: string;
  pressureUnit: string;
  windSpeedUnit: string;

  constructor(private settingService: SettingService) {
    const settings = this.settingService.getSettings();
    this.temperatureUnit = settings.temperatureUnit;
    this.pressureUnit = settings.pressureUnit;
    this.windSpeedUnit = settings.windSpeedUnit;
  }

  updateSettings() {
    this.settingService.updateSettings({
      temperatureUnit: this.temperatureUnit,
      pressureUnit: this.pressureUnit,
      windSpeedUnit: this.windSpeedUnit
    });
  }
}

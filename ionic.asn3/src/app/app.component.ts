import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SwPush } from '@angular/service-worker';
import { ApiService } from './services/api.service';

import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  vapidPublic = 'BOORccUAt3NlPhslOWA9dqxDSD07N7Q9N9txd_Z6unyfuxPFJjKAncqDbPGZ-KyMTQr-8lCywtCiz9UUJ6DitwU';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public api: ApiService,
    swPush: SwPush,
  ) {
    this.initializeApp();

    if (swPush.isEnabled) {
      swPush.requestSubscription({ serverPublicKey: this.vapidPublic })
      .then( subscription => {
        from(this.api.post('subscribe', subscription)).subscribe();
      })
      .catch(console.error);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

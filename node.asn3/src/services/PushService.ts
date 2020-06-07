const webpush = require('web-push');
const vapidKeys: { publicKey: string, privateKey: string } = require('../../push.json');
webpush.setVapidDetails( 'mailto:101484964@student.swin.edu.au', vapidKeys.publicKey, vapidKeys.privateKey );

export class PushService {
  
  subscribers: any[];
  
  constructor() {
    this.subscribers = [];
  }

  // Singleton
  static instance: PushService;
  static get = (): Promise<PushService> => {
    return new Promise<PushService>( resolve => {
      if (!PushService.instance) {
        PushService.instance = new PushService();
      }
      resolve(PushService.instance);
    });
  }

  registerSubscriber = (subscriber: any): void => {
    this.subscribers.push(subscriber);
  }

  sendNotification = async (payload: any): Promise<any> => {
    console.log(payload)
    const promises: Promise<any>[] = [];
    this.subscribers.forEach( subscription => {
      promises.push(
        webpush.sendNotification( subscription, JSON.stringify(payload) )
      );
    });
    return Promise.all(promises).catch( console.error );
  }
}

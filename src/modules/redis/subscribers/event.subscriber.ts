import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  EVENT_CLIENT,
  EVENT_NOTIFICATION_SUBSCRIBER,
} from '../../../shared/constants/redis.constant';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventNotificationSubscriber {
  private readonly _logger = new Logger(EventNotificationSubscriber.name);
  private _eventNotificationSubscriber;

  constructor(
    private readonly _redisService: RedisService,
    private readonly _eventEmitter: EventEmitter2,
  ) {
    this._eventNotificationSubscriber = this._redisService.getClient(
      EVENT_NOTIFICATION_SUBSCRIBER.name,
    );
    this._subscribe();
  }

  private async _subscribe(): Promise<void> {
    const expiredSubKey = `__keyevent@${EVENT_NOTIFICATION_SUBSCRIBER.db}__:expired`;

    this._eventNotificationSubscriber.config(
      'SET',
      'notify-keyspace-events',
      'Ex',
    );

    this._eventNotificationSubscriber.subscribe(expiredSubKey, () => {
      this._logger.log(`Subscribed to "${expiredSubKey}" event channel!`);

      this._eventNotificationSubscriber.on('message', (_, message) => {
        switch (message) {
          case EVENT_CLIENT.SEND_EVENT_NOTIFICATION_EX:
            this._sendEventNotification({});
            break;
        }
      });
    });
  }

  private async _sendEventNotification(data): Promise<void> {
    this._eventEmitter.emit('sendNotification', data);
  }
}

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { EVENT_CLIENT } from '../../shared/constants/redis.constant';

@Injectable()
export class CroneJobService {
  private readonly _redisClient;

  constructor(private readonly _redisService: RedisService) {
    this._redisClient = this._redisService.getClient(EVENT_CLIENT.name);
  }

  @Cron('* 1 * * * *')
  async setupEventNotificationForTomorrow(): Promise<void> {
    this._redisClient.set(
      `${EVENT_CLIENT.SEND_EVENT_NOTIFICATION}:${123123123}`,
      JSON.stringify({}),
    );
    this._redisClient.set(
      EVENT_CLIENT.SEND_EVENT_NOTIFICATION_EX,
      '',
      'ex',
      new Date(),
    );
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonModel, PersonSchema } from './models/person.model';
import { PersonService } from './service/person.service';
import { PersonResolver } from './resolvers/person.resolver';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonModel.name, schema: PersonSchema },
    ]),
    EventModule,
  ],
  providers: [PersonService, PersonResolver],
  exports: [PersonService],
})
export class PersonModule {}

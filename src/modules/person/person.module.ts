import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonModel, PersonSchema } from './models/person.model';
import { PersonService } from './service/person.service';
import { PersonResolver } from './resolvers/person.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonModel.name, schema: PersonSchema },
    ]),
  ],
  providers: [PersonService, PersonResolver],
})
export class PersonModule {}

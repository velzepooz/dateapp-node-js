import { EventInterface } from '../interfaces/event.interface';

export const eventCreatedSubscriptionFilter = (
  payload: EventInterface,
  variables: { personId: string },
) => {
  return payload.personId.toString() === variables.personId;
};

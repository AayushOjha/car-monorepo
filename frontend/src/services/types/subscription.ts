export type CarType = 'HATCHBACK' | 'SEDAN' | 'CSUV' | 'SUV';

export type PlanType = 'DAILY' | 'ALTERNATE';

export type TimeSlot = 'MORNING_6_8_AM' | 'MORNING_8_10_AM' | 'MORNING_10_12_AM';

type CleaningType = 'EXTERIOR' | 'INTERIOR';

type EventStatus = 'PENDING' | 'COMPLETED';

type subscriptionStatus = 'active' | 'canceled';

export interface ISubscription {
  id: string;
  userId: string;
  carType: CarType;
  planType: PlanType;
  startDate: string;
  timeSlot: TimeSlot;
  status: subscriptionStatus;
  // cleaningEvents CleaningEvent[]
}


export interface IPostSubscriptionFrom extends Pick<ISubscription, 'userId'|'carType'|'planType'|'startDate'|'timeSlot'> {}
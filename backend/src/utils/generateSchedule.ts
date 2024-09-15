import { addDays } from 'date-fns';
import { AlternateSchedule } from './constants';

interface CleaningEventData {
  date: Date;
  eventType: 'EXTERIOR' | 'INTERIOR';
  status: 'PENDING';
}

// Utility function to generate the cleaning schedule based on the subscription plan
export const generateCleaningSchedule = (
  planType: 'DAILY' | 'ALTERNATE',
  startDate: Date
): CleaningEventData[] => {
  const events: CleaningEventData[] = [];
  let currentDate = startDate;

  if (planType === 'DAILY') {
    let exteriorCount = 0;
    let interiorCount = 0;

    for (let day = 0; day < 28; day++) {
      if (day === 0) {
        events.push({
          date: currentDate,
          eventType: 'INTERIOR',
          status: 'PENDING'
        });
        interiorCount++;
      } else if (day % 7 === 6) {
      } else {
        // After 12 exteriors, schedule the second INTERIOR cleaning
        if (exteriorCount === 11 && interiorCount === 1) {
          events.push({
            date: currentDate,
            eventType: 'INTERIOR',
            status: 'PENDING'
          });
          interiorCount++;
        } else {
          events.push({
            date: currentDate,
            eventType: 'EXTERIOR',
            status: 'PENDING'
          });
          exteriorCount++;
        }
      }

      currentDate = addDays(currentDate, 1);
    }
  } else if (planType === 'ALTERNATE') {
    for (let day = 0; day < 28; day++) {
      const scheduleValue = AlternateSchedule[day];
      if (scheduleValue) {
        events.push({
          date: currentDate,
          eventType: scheduleValue,
          status: 'PENDING'
        });
      }
      currentDate = addDays(currentDate, 1);
    }
  }

  return events;
};

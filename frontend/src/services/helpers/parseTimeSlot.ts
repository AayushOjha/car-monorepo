import { TimeSlot } from "../types/subscription";

export function getTimeSlotString(timeSlot: TimeSlot): string {
  switch (timeSlot) {
    case 'MORNING_6_8_AM':
      return '6:00 AM - 8:00 AM';
    case 'MORNING_8_10_AM':
      return '8:00 AM - 10:00 AM';
    case 'MORNING_10_12_AM':
      return '10:00 AM - 12:00 PM';
    default:
      return 'Invalid time slot';
  }
}
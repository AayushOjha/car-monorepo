import * as yup from 'yup';

// User creation validation schema
export const createUserSchema = yup.object({
  body: yup.object({
    name: yup.string().required('Name is required').min(2, 'Name should have at least 2 characters'),
    email: yup.string().email('Invalid email format').required('Email is required'),
  }),
});

// Service booking validation schema
export const bookServiceSchema = yup.object({
  body: yup.object({
    carType: yup.mixed().oneOf(['HATCHBACK', 'SEDAN', 'CSUV', 'SUV'], 'Invalid car type').required(),
    planType: yup.mixed().oneOf(['DAILY', 'ALTERNATE'], 'Invalid plan type').required(),
    startDate: yup.date().required('Start date is required'),
    timeSlot: yup.mixed().oneOf(
      ['MORNING_6_8_AM', 'MORNING_8_10_AM', 'MORNING_10_12_AM'],
      'Invalid time slot'
    ).required(),
  }),
});

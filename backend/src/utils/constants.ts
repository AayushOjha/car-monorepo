const Services = ['EXTERIOR', 'INTERIOR'] as const;

type ServiceType = (typeof Services)[number];

export const AlternateSchedule: (ServiceType | null)[] = [
  'INTERIOR',
  null,
  'EXTERIOR',
  null,
  'EXTERIOR',
  null,
  null,
  'EXTERIOR',
  null,
  'EXTERIOR',
  null,
  'EXTERIOR',
  null,
  null,
  'INTERIOR',
  null,
  'EXTERIOR',
  null,
  'EXTERIOR',
  null,
  null,
  'EXTERIOR',
  null,
  'EXTERIOR',
  null,
  'EXTERIOR',
  null,
  null
];

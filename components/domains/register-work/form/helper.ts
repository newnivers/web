export const combineDateTime = (dateObject: Date, timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);

  dateObject.setHours(hours, minutes);

  return dateObject;
};

// "schedules": ["2023-11-18T11:30:00.000+03:00", "2023-11-18T12:30:00.000+03:00", "2023-11-19T11:30:00.000+03:00"]

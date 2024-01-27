import dayjs from "dayjs";

export const combineDateTime = (dateObject: Date, timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);

  dateObject.setHours(hours, minutes);

  return dateObject;
};

export const getTimeIntervals = () => {
  let currentTime = dayjs().startOf("day");
  const endOfDay = dayjs().endOf("day");

  const timeIntervals = [];

  while (currentTime.isBefore(endOfDay)) {
    timeIntervals.push({
      value: currentTime.format("HH:mm"),
      label: currentTime.format("HH:mm"),
    });
    currentTime = currentTime.add(30, "minute");
  }

  return timeIntervals;
};

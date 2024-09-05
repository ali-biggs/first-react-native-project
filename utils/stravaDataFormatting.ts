export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const year: number = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDistance = (distanceInMeters: number) => {
  const distanceInKilometers: number = distanceInMeters / 1000;
  return distanceInKilometers.toFixed(2);
};

export const formatTime = (timeInSeconds: number) => {
  const hours: number = Math.floor(timeInSeconds / 3600);
  const minutes: number = Math.floor((timeInSeconds % 3600) / 60);
  const seconds: number = timeInSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

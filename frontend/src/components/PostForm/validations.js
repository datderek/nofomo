export const hasStart = (watch) => (val) => {
  if (val !== '' && typeof watch('eventStart') === 'undefined') {
    return 'Please provide a start time when selecting an end time';
  }
};

export const greaterThanStart = (watch) => (val) => {
  const startDate = watch('eventStart');
  const endDate = val;
  if (endDate < startDate) {
    return 'End time must be after start time';
  }
};

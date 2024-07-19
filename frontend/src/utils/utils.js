export const formatDate = (date) => {
  if (typeof date === 'undefined') return date;

  return date.toISOString().slice(0, 19).replace('T', ' ');
};

export const formatDate = (date) => {
  if (typeof date === 'undefined') return '';

  return date.toISOString().slice(0, 19).replace('T', ' ');
};

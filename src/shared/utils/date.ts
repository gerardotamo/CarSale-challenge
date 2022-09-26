const DateToday = () => {
  return (
    new Date().getFullYear() +
    '-' +
    (new Date().getMonth() < 9
      ? '0' + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1) +
    '-' +
    (new Date().getDate() < 10
      ? '0' + new Date().getDate()
      : new Date().getDate())
  );
};

export { DateToday };

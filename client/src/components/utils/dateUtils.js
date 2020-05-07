export const fotmatedDateValues = (dateText) => {
  if (!dateText) return "";
  const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const date = new Date(dateText);
  const dateArray = dateFormat.formatToParts(date);
  const formatedDate = `${dateArray[4].value}/${dateArray[0].value}/${dateArray[2].value}`;
  const dateValues = { year: dateArray[4].value, fullDate: formatedDate };
  return dateValues;
}
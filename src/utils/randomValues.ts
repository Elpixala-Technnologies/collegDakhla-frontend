export function getRandomRatingValue() {
  const values = [3, 3.5, 4, 4.5, 5];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

export function getRandomReviews(){
  const min = 400;
const max = 10000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatNumber(num:number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return num.toString();
  }
}
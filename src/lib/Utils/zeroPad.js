export default function zeroPad({ num, places }){
  return String(num).padStart(places, '0');
}
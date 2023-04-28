export default function remsToPixels({ rems, viewportW = 1440 }){
  if(!rems){
    throw new Error('no rems');
  }
  const pixels = rems * 10;
  return (pixels / 1440) * viewportW; 
}

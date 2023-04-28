export default function isInViewportMiddle(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const topOffset = rect.top;
  const bottomOffset = rect.bottom;
  const elementHeight = bottomOffset - topOffset;
  const middleOfViewport = windowHeight / 2;
  const elementMidpoint = topOffset + (elementHeight / 2);

  return (elementMidpoint >= (middleOfViewport - (elementHeight / 2))) && (elementMidpoint <= (middleOfViewport + (elementHeight / 2)));
}
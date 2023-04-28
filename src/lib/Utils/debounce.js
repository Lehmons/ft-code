// debounce limits rate function can fire
//
// https://gist.github.com/nmsdvid/8807205
const debounce = (callback, time = 250, interval) => (...args) => {
  clearTimeout(interval);
  interval = setTimeout(() => callback(...args), time);
};

export default debounce;
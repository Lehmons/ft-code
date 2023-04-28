const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
};

export default hasClass;
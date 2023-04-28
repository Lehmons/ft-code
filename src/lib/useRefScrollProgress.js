import React, { useRef, useState, useEffect } from "react";

// https://cole.codes/posts/framer-motion-useviewportscroll-element-scroll
/*
  Takes an optional component ref (or returns a new one)
  and returns the ref, the scroll `start` and `end` percentages
  that are relative to the total document progress.
*/
export default function useRefScrollProgress({ inputRef, threshold = 0 }) {
  const ref = inputRef;
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const adjustment = threshold ? threshold - rect.height : 0;
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop + adjustment;

    const offsetTop = rect.top + scrollTop;
    setStart(offsetTop / document.body.clientHeight);
    setEnd((offsetTop + rect.height) / document.body.clientHeight);
  });

  return { ref, start, end };
}

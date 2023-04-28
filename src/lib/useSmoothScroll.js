import {
  useRef, useCallback, useEffect, useState
} from 'react';

function useSmoothScroll() {
  const scrollRafPending = useRef(false);
  const scrollRafInstance = useRef(false);
  const wheelRafPending = useRef(false);
  const wheelRafInstance = useRef(false);
  const isAnimating = useRef(false);
  const topVal = useRef();
  const [scrollCompleted, setScrollCompleted] = useState(false);
  const [scrollAborted, setScrollAborted] = useState(false);

  const scroller = useCallback(({
    left, top, elem, opts
  }) => {
    if (left === undefined && top === undefined) {
      throw new Error('smoth scroll parameters were not defined');
    }

    topVal.current = top;
    isAnimating.current = true;

    if (elem) {
      if (elem.current) {
        elem.current.scrollIntoView(
          opts || { behavior: 'smooth', block: 'start', inline: 'start' }
        );
      }
      return;
    }

    window.scrollTo({
      top,
      left,
      behavior: 'smooth'
    });
  }, []);

  const onScroll = () => {
    if (!isAnimating.current) {
      return;
    }
    const scrollY = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollY >= topVal.current - 5 && scrollY < topVal.current + 5) {
      isAnimating.current = false;
      setScrollCompleted(true);
    }
  };

  const onWheel = () => {
    if (!isAnimating.current) {
      return;
    }
    isAnimating.current = false;
    setScrollAborted(true);
  };

  const scrollHandler = () => {
    if (scrollRafPending.current) {
      return;
    }
    scrollRafPending.current = true;
    scrollRafInstance.current = window.requestAnimationFrame(() => {
      scrollRafPending.current = false;
      onScroll();
    });
  };

  const wheelHandler = () => {
    if (wheelRafPending.current) {
      return;
    }
    wheelRafPending.current = true;
    wheelRafInstance.current = window.requestAnimationFrame(() => {
      wheelRafPending.current = false;
      onWheel();
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, {
      capture: true,
      passive: true
    });
    window.addEventListener('wheel', wheelHandler, {
      capture: true,
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', scrollHandler, {
        capture: true,
        passive: true
      });
      window.removeEventListener('wheel', wheelHandler, {
        capture: true,
        passive: true
      });
    };
  }, []);

  return [scrollCompleted, scrollAborted, scroller];
}

export default useSmoothScroll;

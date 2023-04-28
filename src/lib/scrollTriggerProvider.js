import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { MotionValue, useMotionValue } from "framer-motion";
import clamp from "lodash/clamp";
import React, { useContext, useEffect, useRef } from "react";

const ScrollTriggerContext = React.createContext(null);

const useScrollTrigger = () => useContext(ScrollTriggerContext);

const DEFAULT_OPTIONS = {
  end: "+=100%",
  pin: true,
  scrub: true,
  start: "top top"
};

const ScrollTriggerProvider = ({ children, debug = false, options = {} }) => {
  const refScrollTrigger = useRef(null);

  const refTimeline = useRef();

  const progress = useMotionValue(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (refScrollTrigger.current) {
      refTimeline.current = gsap.timeline({
        scrollTrigger: {
          ...DEFAULT_OPTIONS,
          ...options,
          markers: debug,
          trigger: refScrollTrigger.current,
          onUpdate: instance => {
            progress.set(clamp(instance.progress, 0, 1));
          }
        }
      });
    }

    return () => {
      // Kill and clear the timeline and scrolltrigger instance when updated/unmounted.
      refTimeline.current?.scrollTrigger?.kill();
      refTimeline.current?.kill();
      refTimeline.current?.clear();
    };
  }, [debug, options, progress]);

  return (
    <section ref={refScrollTrigger}>
      <ScrollTriggerContext.Provider value={progress}>
        {children}
      </ScrollTriggerContext.Provider>
    </section>
  );
};

export { ScrollTriggerProvider, useScrollTrigger };

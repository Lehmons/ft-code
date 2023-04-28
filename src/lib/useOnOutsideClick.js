import { useEffect, useRef } from "react";

export default function useOnOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      callback();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
}

require("intersection-observer");
import smoothscroll from "smoothscroll-polyfill";

if (typeof window !== "undefined") {
  smoothscroll.polyfill();
}

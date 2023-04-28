// ****************************************/
// Animations
// ****************************************/

import { css } from "styled-components";

const fadeIn = css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const fadeOut = css`
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const scaleFadeout = css`
  @keyframes scaleFadeout {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.85);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
`;

const pulseRing = css`
  @keyframes pulse-ring {
    from {
      transform: scale(0.33);
    }
    80%,
    100% {
      opacity: 0;
    }
  }
`;

const gradient = css`
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const slideIn = css`
  @keyframes slideIn {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;

const animation = {
  fadeIn,
  fadeOut,
  scaleFadeout,
  pulseRing,
  gradient,
  slideIn
};

export default animation;

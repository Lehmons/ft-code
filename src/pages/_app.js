import polyfills from '@/lib/polyfills';
import "@/components/Styles/FontFace.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "@/components/Styles";
import { initialState as appStore } from "../stores/AppStore";
import Store from "../stores";
import { AnimatePresence, motion } from "framer-motion";

// Build initial state
const initialState = {
  ...appStore,
};

const ThemeWrapper = (props) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: [0.42, 0, 0.58, 1],
  duration: 0,
};

const pageStyle = {
  position: "absolute",
};

export default function App({ Component, pageProps, router }) {
  return (
    <ThemeWrapper>
      <Store.Provider initialState={initialState}>
        <>
          <AnimatePresence>
            <motion.section
              key={router.asPath}
              variants={pageVariants}
              transition={pageTransition}
              className="page-wrapper"
              initial="initial"
              animate="in"
              exit="out"
            >
              <Component
                {...pageProps}
                router={router}
                key={router.asPath}
                query={router.query}
                asPath={router.asPath}
                variants={pageVariants}
                pageTransition={{ ...pageTransition }}
                pageStyle={{
                  ...pageStyle,
                }}
              />
            </motion.section>
          </AnimatePresence>
          <GlobalStyles />
        </>
      </Store.Provider>
    </ThemeWrapper>
  );
}
import Store from ".";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  isMenuOpen: false
};

function useAppStore() {
  const [state, setState] = Store.useStore(initialState);

  const setIsMenuOpen = (bool) => {
    setState((draft) => {
      draft.isMenuOpen = bool;
    });
  };

  return [
    state,
    {
      setIsMenuOpen
    },
  ];
}

export { initialState, useAppStore };

import { useComponentDidMount } from "hooks/useComponentDidMount";
import React, { useContext, useReducer } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
const UserContext = React.createContext();

/* ========================================================================== */
/*                                INITIAL STATE                                */
/* ========================================================================== */

const initialState = () => {
  const user = JSON.parse(localStorage.getItem("user-chat"));
  if (user) {
    console.log("storedUser");

    return user;
  }
  return {
    user: {},
    isLogin: false,
  };
};

/* ========================================================================== */
/*                                ACTION TYPES                                */
/* ========================================================================== */

export const userTypes = {
  Login: "Login",
  SET_AVATAR: "SET_AVATAR",
};

/* ========================================================================== */
/*                                   REDUCER                                  */
/* ========================================================================== */

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case userTypes.Login:
      return {
        user: payload,
        isLogin: true,
      };
    case userTypes.SET_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: payload,
        },
      };

    default:
      return state;
  }
};

/* ========================================================================== */
/*                           CUSTOM HOOK FOR CONTEXT                          */
/* ========================================================================== */

const useCtxValues = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useCtxValues must be used within a UserProvider ");
  }
  return context;
};

/* ========================================================================== */
/*                              CONTEXT PROVIDER                              */
/* ========================================================================== */

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState());
  const isComponentMounted = useComponentDidMount();

  //persist our state in localStorage
  useDeepCompareEffect(() => {
    if (isComponentMounted) {
      localStorage.setItem("user-chat", JSON.stringify(state));
      console.log("persist", state);
    }
  }, [state]);

  //load our state from localStorage
  // React.useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user-chat"));
  //   if (storedUser) {
  //     console.log("storedUser");
  //     dispatch({ type: userTypes.Login, payload: storedUser });
  //   }
  // }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default useCtxValues;

/* ---------------------------------- help ---------------------------------- */

// const [state, dispatch] = useCtxValues();

/* ------------------------------------ - ----------------------------------- */

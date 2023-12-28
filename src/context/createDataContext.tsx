import React, { useReducer, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default <Action, State>(
  reducer: (state: State, action: Action) => State,
  actions: any,
  defaultValue: State
) => {
  const Context = React.createContext(defaultValue);

  const Provider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundActions: any = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

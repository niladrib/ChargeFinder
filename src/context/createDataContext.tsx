import React, { useReducer, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface ContextBuilder<Action, State, Context> {
  build: (dispatch: React.Dispatch<Action>, state: State) => Context;
}

export default <Action, State, Context>(
  reducer: (state: State, action: Action) => State,
  contextBuilder: ContextBuilder<Action, State, Context>,
  defaultValue: State
) => {
  const context = React.createContext<Partial<Context>>({});

  const provider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const contextValue = contextBuilder.build(dispatch, state);
    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  return { context, provider };
};

export { ContextBuilder };

import React, { useReducer, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface ModelBuilder<Action, State, Model> {
  build: (dispatch: React.Dispatch<Action>, state: State) => Model;
}

export default <Action, State, Context>(
  reducer: (state: State, action: Action) => State,
  modelBuilder: ModelBuilder<Action, State, Context>,
  defaultValue: State
) => {
  const context = React.createContext<Partial<Context>>({});

  const provider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const model = modelBuilder.build(dispatch, state);
    return <context.Provider value={model}>{children}</context.Provider>;
  };

  return { context, provider };
};

export { ModelBuilder as ContextBuilder };

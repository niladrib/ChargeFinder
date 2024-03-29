import React, { useReducer, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface ViewModelBuilder<Action, State, Model> {
  build: (dispatch: React.Dispatch<Action>, state: State) => Model;
}

export default <Action, State, Model>(
  reducer: (state: State, action: Action) => State,
  modelBuilder: ViewModelBuilder<Action, State, Model>,
  defaultValue: State
) => {
  const context = React.createContext<Model | null>(null);

  const provider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const model = modelBuilder.build(dispatch, state);
    return <context.Provider value={model}>{children}</context.Provider>;
  };

  return { context, provider };
};

export { ViewModelBuilder as ContextBuilder };

import { Action, Reducer } from "redux";
export interface Item {
  id: number;
  selectedId: number;
  value: string;
}

export interface InitialState {
  list: Array<Item>;
}

export interface Item {
  id: number;
  completed: boolean;
  value: string;
}

export const initialState: InitialState = {
  list: [],
};


export enum ActionType {
  AddValue,
  Completed,
  Imcompleted,
  UpdateValue,
}

export const rootReducer: Reducer = (state = initialState, action) => {

  return state;
};

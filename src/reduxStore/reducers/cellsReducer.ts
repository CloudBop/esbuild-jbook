import { stat } from "fs";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsReducerState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsReducerState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export function cellsReducer(
  state: CellsReducerState,
  action: Action
): CellsReducerState {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;

    default:
      return state;
  }
}

export default cellsReducer;

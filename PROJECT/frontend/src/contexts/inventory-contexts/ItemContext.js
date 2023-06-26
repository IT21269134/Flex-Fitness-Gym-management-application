import { createContext, useReducer } from "react";

export const ItemsContext = createContext();

export const ItemsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        items: action.payload,
      };
    case "CREATE_ITEMS":
      return {
        items: [action.payload, ...state.items],
      };
    case "DELETE_ITEM":
      return {
        items: state.items.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_ITEM":
      const updatedItemIndex = state.items.findIndex(
        (w) => w._id === action.payload._id
      );
      const updatedItems = [...state.items];
      updatedItems[updatedItemIndex] = action.payload;
      return {
        items: updatedItems,
      };

    default:
      return state;
  }
};

export const ItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ItemsReducer, {
    items: null,
  });

  return (
    <ItemsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};

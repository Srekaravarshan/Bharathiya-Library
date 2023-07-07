export const initialState = {
  popularBooks: {},
    user: null,
    books: {},
    cart: new Map(),
  };
  
  export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);
  
  const reducer = (state, action) => {
    switch (action.type) {
     
  
      case "ADD_TO_CART":
        return {
          ...state,
          cart: new Map([...state.cart, ...action.cart]),
        };
      case "ADD_BOOKS":
        return {
          ...state,
          books: {...state.books, ...action.books},
        };
  
      case "SET_POPULAR_BOOKS":
        return {
          ...state,
          popularBooks: action.popularBooks,
        };
  
      case "SET_USER":
        return {
          ...state,
          user: action.user,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
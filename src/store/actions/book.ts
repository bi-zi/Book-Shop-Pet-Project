import axios from 'axios';
import { Dispatch } from 'redux';
import { BookAction, BookActionTypes } from '../types/book';

export const fetchBooks = () => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.FETCH_BOOKS });
      const response = await axios.get('https://data-base-for-app.herokuapp.com/books');
      dispatch({ type: BookActionTypes.FETCH_BOOKS_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: BookActionTypes.FETCH_BOOKS_ERROR,
        payload: 'Произошла ошибка при загрузке данных',
      });
    }
  };
};

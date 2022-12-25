import { ResponseData } from '../types/data';
import {
  itemsLoading,
  itemsLoadingError,
  itemsLoadingSuccess,
  categoriesLoadingSuccess,
  brandsLoadingSuccess,
} from './reducers/itemState';
import { AppDispatch } from './rootReducer';
import { getCategories, getBrands } from '../utils/data';
import { URL } from '../const/const';

const loadItemsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(itemsLoading());
    const response = await fetch(URL);
    const data: ResponseData = await response.json();
    const items = data.products;
    const categories = getCategories(items);
    const brands = getBrands(items);
    dispatch(itemsLoadingSuccess(items));
    dispatch(brandsLoadingSuccess(brands));
    dispatch(categoriesLoadingSuccess(categories));
  } catch (err) {
    dispatch(itemsLoadingError(`Error: ${err}`));
  }
};

export default loadItemsAction;

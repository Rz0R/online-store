import { ResponseData } from '../types/data';
import {
  itemsLoading,
  itemsLoadingError,
  itemsLoadingSuccess,
  categoriesLoadingSuccess,
  brandsLoadingSuccess,
  pricesLoadingSucces,
} from './reducers/itemState';
import { AppDispatch } from './rootReducer';
import { getCategories, getBrands, getPrices } from '../utils/data';
import { URL } from '../const/const';

const loadItemsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(itemsLoading());
    const response = await fetch(URL);
    const data: ResponseData = await response.json();
    const items = data.products;
    const categories = getCategories(items);
    const brands = getBrands(items);
    const prices = getPrices(items);
    dispatch(itemsLoadingSuccess(items));
    dispatch(brandsLoadingSuccess(brands));
    dispatch(pricesLoadingSucces(prices));
    dispatch(categoriesLoadingSuccess(categories));
  } catch (err) {
    dispatch(itemsLoadingError(`Error: ${err}`));
  }
};

export default loadItemsAction;

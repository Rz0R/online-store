import { ResponseData } from '../types/data';
import {
  itemsLoading,
  itemsLoadingError,
  itemsLoadingSuccess,
  categoriesLoadingSuccess,
  brandsLoadingSuccess,
  pricesLoadingSuccess,
  stocksLoadingSuccess,
} from './reducers/itemState';
import { AppDispatch } from './rootReducer';
import { getCategories, getBrands, getPrices, getStocks } from '../utils/data';
import { URL } from '../const/const';

const loadItemsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(itemsLoading());
    const response = await fetch(URL);
    const data: ResponseData = await response.json();
    const items = data.products.filter((product) => product.images.length >= 2);
    const categories = getCategories(items);
    const brands = getBrands(items);
    const prices = getPrices(items);
    const stocks = getStocks(items);
    dispatch(itemsLoadingSuccess(items));
    dispatch(brandsLoadingSuccess(brands));
    dispatch(pricesLoadingSuccess(prices));
    dispatch(stocksLoadingSuccess(stocks));
    dispatch(categoriesLoadingSuccess(categories));
  } catch (err) {
    dispatch(itemsLoadingError(`Error: ${err}`));
  }
};

export default loadItemsAction;

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import loadItemsAction from '../../store/serviceActions';

function Main() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.ITEMS);

  useEffect(() => {
    dispatch(loadItemsAction());
  }, []);

  return (
    <main className="main">
      <div className="main__container">{!isLoading && JSON.stringify(items, null, 2)}</div>
    </main>
  );
}

export default Main;

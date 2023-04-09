import s from './Filter.module.css';
import { addFilter } from 'redux/filterSlice';
import { useDispatch } from 'react-redux';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        onChange={e => dispatch(addFilter(e.target.value))}
        placeholder="type here"
      />
    </label>
  );
};

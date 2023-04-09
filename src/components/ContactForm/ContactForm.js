import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './ContactForm.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      toast(`We need a name.`);
      return;
    }

    if (!number) {
      toast(`We need a number.`);
      return;
    }

    if (
      contacts.find(
        c => c.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      toast(`${name} is already in contacts.`);
      reset();
      return;
    }

    dispatch(addContact({ name, number }));
    reset();
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="type here"
        />
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="type here"
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

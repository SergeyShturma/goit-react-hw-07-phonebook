import s from 'components/App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { getFilteredContacts } from 'redux/selectors';
import Notification from 'components/Notification/Notification';
import NotificationGood from 'components/NotificationGood/NotificationGood';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { getContacts } from 'redux/operations';

export default function App() {
  const dispatch = useDispatch();

  const isContacts = Boolean(useSelector(getFilteredContacts).length);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div className={s.main}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={s.title}>Contacts</h2>
      <>
        {isContacts ? (
          <>
            <Filter />
            <ContactList />
            <NotificationGood />
          </>
        ) : (
          <Notification />
        )}
      </>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

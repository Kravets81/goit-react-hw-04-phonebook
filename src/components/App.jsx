import React, { useEffect, useState } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = contact => {
    if (
      Array.isArray(contacts) &&
      contacts.find(item => item.name === contact.name)
    ) {
      alert('Contact already exists');
      return;
    }
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const contactsToDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleChange = e => {
    setFiltered(e.target.value);
  };

  const handleFilterContacts = () => {
    if (!Array.isArray(contacts)) {
      return [];
    }

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filtered.toLowerCase().trim());
    });
  };

  const filteredContacts = handleFilterContacts(contacts, filtered);
  const savedContacts = contacts.length;

  return (
    <div className={css.wrapper}>
      <div className={css.form__wrap}>
        <h1 className={css.form__title}>Phonebook</h1>
        <ContactsForm addContact={handleAddContact} />
      </div>

      <div className={css.filter__wrap}>
        <h2 className={css.filter__subtitle}>Contacts</h2>
        <Filter
          value={filtered}
          handleChange={handleChange}
          savedLocalContacts={savedContacts}
        />
        <ContactsList
          contacts={filteredContacts}
          savedLocalContacts={savedContacts}
          contactsToDelete={contactsToDelete}
        />
      </div>
    </div>
  );
};

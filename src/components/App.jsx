import React, { Component } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    filter: '',
  };

  componentDidMount() {
    this.loadContactsFromLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.saveContactsToLocalStorage();
    }
  }

  loadContactsFromLocalStorage() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  saveContactsToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleAddContact = contact => {
    if (
      Array.isArray(this.state.contacts) &&
      this.state.contacts.find(item => item.name === contact.name)
    ) {
      alert('Contact already exists');
      return;
    }
    this.setState(prevState => ({
      contacts: Array.isArray(prevState.contacts)
        ? [...prevState.contacts, contact]
        : [contact],
    }));
  };

  contactsToDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleFilterContacts = () => {
    const { contacts, filter } = this.state;

    if (!Array.isArray(contacts)) {
      return [];
    }

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase().trim());
    });
  };

  render() {
    const filteredContacts = this.handleFilterContacts();
    const savedContacts = this.state.contacts.length;

    return (
      <div className={css.wrapper}>
        <div className={css.form__wrap}>
          <h1 className={css.form__title}>Phonebook</h1>
          <ContactsForm addContact={this.handleAddContact} />
        </div>

        <div className={css.filter__wrap}>
          <h2 className={css.filter__subtitle}>Contacts</h2>
          <Filter
            value={this.state.filter}
            handleChange={this.handleChange}
            savedLocalContacts={savedContacts}
          />
          <ContactsList
            contacts={filteredContacts}
            savedLocalContacts={savedContacts}
            contactsToDelete={this.contactsToDelete}
          />
        </div>
      </div>
    );
  }
}

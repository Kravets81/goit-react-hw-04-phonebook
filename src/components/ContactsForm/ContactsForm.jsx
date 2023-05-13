import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactsForm.module.css';

export default class ContactsForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addContact({ id: nanoid(6), ...this.state });
    this.reset();
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={[css.form__label]}>
          Name
          <input
            className={[css.form__input]}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            value={this.state.name}
          />
        </label>
        <label className={[css.form__label]}>
          Number
          <input
            className={[css.form__input]}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            value={this.state.number}
          />
        </label>
        <button className={[css.form__button]}>Add contact</button>
      </form>
    );
  }
}

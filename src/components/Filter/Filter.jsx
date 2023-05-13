import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export default function Filter({ value, handleChange, savedLocalContacts }) {
  return (
    <>
      <label className={css.filter__label}>
        Find contacts by name:
        <input
          className={css.filter__input}
          type="text"
          name="filter"
          value={value}
          onChange={handleChange}
        />
      </label>
      {savedLocalContacts === 0 && (
        <p>
          There are no contacts in your phonebook. Please add your first
          contact!
        </p>
      )}
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  savedLocalContacts: PropTypes.number.isRequired,
};

import { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchBarHeader, SearchForm, Button, Input } from './Searchbar.styled';
import { BsZoomIn } from 'react-icons/bs';
import { Report } from 'notiflix/build/notiflix-report-aio';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      Report.failure('Search Failure', 'Please enter seach query', 'Ok');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          name="searchQuery"
          value={query}
          onChange={handleNameChange}
        />
        <Button type="submit">
          <BsZoomIn size={25} />
        </Button>
      </SearchForm>
    </SearchBarHeader>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

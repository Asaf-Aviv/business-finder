import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);

  const [searchResults, setSearchResults] = useState(null);

  const handleTermChange = (e) => {
    setTerm(e.target.value);
    setOffset(0);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setOffset(0);
  };

  const loadMore = async () => {
    const res = await axios.post('/graphql', {
      term,
      location,
      offset,
    });

    setSearchResults([
      ...searchResults,
      ...res.data.search.business,
    ]);

    setOffset(offset + 20);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(term, location);

    const res = await axios.post('/graphql', {
      term,
      location,
    });

    console.log(res.data.search);

    setTotal(res.data.search.total);
    setSearchResults(res.data.search.business);
    setOffset(offset + 20);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleTermChange}
          type="text"
          value={term}
          placeholder="Ex: Pizza StarBucks Zara..."
        />
        <input
          onChange={handleLocationChange}
          type="text"
          value={location}
          placeholder="Ex: Germany US DE..."
        />
        <button type="submit">Submit</button>
      </form>
      {searchResults && (
        <>
          <h1>{`Found ${total} results`}</h1>
          {searchResults.map(b => (
            <div>
              <h1>{b.name}</h1>
              <h2>{b.location.formatted_address}</h2>
              <h5>{b.rating}</h5>
              <h5>{b.review_count}</h5>
            </div>
          ))}
          {offset && (
            <button onClick={loadMore} type="button">
              Load More
            </button>
          )}
        </>
      )}
    </>
  );
};

export default SearchBar;

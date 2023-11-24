/*
import React from 'react';

const SearchPage = () => {
  return (
    <div>
      검색 페이지 입니다
    </div>
  );
};

export default SearchPage;
*/

import React from 'react';
import Row from '../../Components/Row';

const SearchPage = ({ loggedInUser }) => {
  return (
    <div>
      <Row genre="Action" loggedInUser={loggedInUser} />
      <Row genre="Drama" loggedInUser={loggedInUser} />
      <Row genre="Comedy" loggedInUser={loggedInUser} />
      {/* Add more rows for other genres as needed */}
    </div>
  );
};

export default SearchPage;
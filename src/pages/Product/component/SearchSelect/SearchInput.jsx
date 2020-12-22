import React from 'react';

const SearchInput = React.forwardRef((props, ref) => {
  const { value, onSearchChange, onSearchBlur } = props;
  return (
    <div>
      <input autoFocus ref={ref} value={value} type="text" onChange={onSearchChange} onBlur={onSearchBlur} />
    </div>
  );
});

export default SearchInput;

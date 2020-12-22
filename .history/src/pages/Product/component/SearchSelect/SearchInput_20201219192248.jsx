import React from 'react';

const SearchInput = React.forwardRef((props, ref) => {
  const { value, onSearchChange } = props;
  return (
    <div>
      <input
        autoFocus
        ref={ref}
        value={value}
        type="text"
        onChange={onSearchChange}
      />
    </div>
  );
});

export default SearchInput;

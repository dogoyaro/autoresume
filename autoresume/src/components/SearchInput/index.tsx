import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = (props: SearchInputProps) => {
  const { searchParam, placeholder} = props;
  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
      <Search
        placeholder={placeholder}
        onSearch={(value: string) => searchParam(value)}
        size="large"
      />
    </div>
  ); 
}

export default SearchInput;

export type SearchInputProps = { searchParam: Function, placeholder: string };

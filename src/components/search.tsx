function SearchBox(props) {
  const onChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="search-box">Search</label>
      <input placeholder="search translations" onChange={onChange} />
    </div>
  );
};

export default SearchBox;

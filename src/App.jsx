import * as React from "react";

const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

const List = ({ list }) => (
  <ul>
    {list.map(({ objectID, ...item }) => (
      <Item key={objectID} {...item} />
    ))}
  </ul>
);

const Search = ({ search, onSearch }) => (
  <>
    <label htmlFor="search">Search:</label>
    <input id="search" type="text" value={search} onChange={onSearch} />
  </>
);

const InputWithLabel = ({ id, label, value, onInputChange }) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input id={id} type="text" value={value} onChange={onInputChange} />
  </>
);

const App = () => {
  const stories = [
    {
      title: "React",
      url: "http://reactjs.org",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "http://redux.js.org",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const useStorageState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    localStorage.setItem("search", event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Hello React</h1>

      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      />
      <Search onSearch={handleSearch} search={searchTerm} />
      <hr />

      <List list={searchedStories} />
    </div>
  );
};

export default App;

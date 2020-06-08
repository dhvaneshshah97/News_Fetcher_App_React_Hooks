import React, { Component, useState, useEffect } from 'react';

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState(`http://hn.algolia.com/api/v1/search`)
  const [loading, setLoading] = useState(false)

  // fetch news
  const fetchNews = () => {
    setLoading(true)
    fetch(url)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error))

  };

  useEffect(() => {
    setTimeout(fetchNews(), 1000)
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    setSearchQuery("")
  }

  const showLoading = () => {
    return (
      loading ? <div className="spinner-border m-2" role="status">
        <span className="sr-only">Loading...</span>
      </div> : ""
    )
  }

  const showNavbar = () => {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <i className="fas fa-newspaper mr-2" /><span className="navbar-brand">Hacker News API</span>
          <form className="form-inline" onSubmit={handleSubmit}>
            <input type="text" className="form-control mr-2" value={searchQuery} onChange={handleChange} placeholder="Enter a keyword" />
            <button className="btn btn-primary ">Search</button>
            {showLoading()}
          </form>
        </nav>

      </div>
    );
  }

  const showNews = () => {
    return (
      <div>
        {
          news.map((n, i) =>
            (<p key={i}><i className="fas fa-caret-right lg" />{" "}{n.title}{" | "}<a href={n.url} rel="noopener noreferrer" target="_blank">Post</a></p>))
        }
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{" "}</h2>
      {showNavbar()}
      {showNews()}
    </div>
  );
}

export default App;

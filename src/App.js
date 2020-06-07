import React, { Component, useState, useEffect } from 'react';

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState(`http://hn.algolia.com/api/v1/search?query=react`)
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
    setTimeout(fetchNews(), 2000) 
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  return (
    <div className="container">
      <h2><i className="fas fa-newspaper" />{" "}Hacker News API</h2>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="keyword" className="mr-2 mb-2">Enter a keyword</label>
          <input type="text" className="form-control mr-2 mb-2" value={searchQuery} onChange={handleChange} />
        </div>
        <button className="btn btn-primary btn-sm mb-2">Search</button>
        {loading ?<div class="spinner-border m-2" role="status">
          <span class="sr-only">Loading...</span>
        </div> : ""
        }
      </form>
      <div>
        {
          news.map((n, i) =>
            (<p key={i}><i className="fas fa-caret-right" />{" "}{n.title}{" | "}<a href={n.url}>Post</a></p>))
        }
      </div>
    </div>
  );
}

export default App;

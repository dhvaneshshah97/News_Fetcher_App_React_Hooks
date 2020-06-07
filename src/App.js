import React, { Component, useState, useEffect } from 'react';

const App = () => {
  // state
  const [news, setNews] = useState([]);

  const fetchNews = () => {
    fetch('http://hn.algolia.com/api/v1/search?query=react')
      .then(result => result.json())
      .then(data => setNews(data.hits))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews()
  })

  return (
    <div className="container">
      <h2 className="text-center"><i className="fas fa-newspaper" />{" "}News</h2>
      {
        news.map((n, i) => (<p key={i} className="text-center"><i className="fas fa-hand-point-right" />{" "}{n.title}</p>))
      }
    </div>
  );
}

export default App;

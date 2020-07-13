import React, {  useState, useEffect } from 'react';

const App = () => {
  // state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState(`https://hn.algolia.com/api/v1/search`)
  const [loading, setLoading] = useState(false)

  // fetch news
  const fetchNews = async() => {
    setLoading(true)
    const rawResponse = await fetch(url);
    const response = await rawResponse.json();
    if (response.error){
      console.log(response.error)
    } else {
      setNews(response.hits);
      setLoading(false);
    }

  };

  useEffect(() => {
    setTimeout(fetchNews(), 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light row">
          <i className="fas fa-newspaper mr-2" /><span className="navbar-brand">Hacker News API</span>
          <div className="col-6"></div>
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

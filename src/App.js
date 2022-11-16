import './App.css';
import React from 'react';


function SearchForm(props) {

  return (
      <div>
      <input type="text" placeholder="Search.." name="search" id="search"/>
      <button type="submit" onClick={props.handleSearch}><i className="fa fa-search"></i></button>
      </div>

  )

}

function SearchPage(props) {
  
  return (
    <div className="search-page">
      <h2>Get Dell</h2>
      <SearchForm handleSearch={props.handleSearch}/>
    </div>
  )
}

function Content(props) {

  return (
    <div className="content">
      <a href={props.url} target="_blank">
        <p>{props.url}</p>
        <h4>{props.title}</h4>
      </a>
    </div>
  )

}

function ContentPage(props) {

  const list = []
  for (let i=0; i<props.data.length; i++){
    list.push(
      <Content 
        url={props.data[i].url} 
        title={props.data[i].title} 
      />
    )
  }

  return (
    <div className='content-page'>
      {list}
    </div>
  )

}

async function search(searchTerm) {

  const response = await fetch(`http://127.0.0.1:8009/godell_search_engine?` + new URLSearchParams({searchTerm: searchTerm}), {
  //const response = await fetch(`http://localhost:5000/search?` + new URLSearchParams({searchTerm: searchTerm}), {
      method: 'GET'
    })
  let resp =  await response.json();
  console.log(resp)
  return resp

}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [] 
    };

  }

  async handleSearch(searchTerm) {

    const data = await search(searchTerm)

    console.log(`in handlesearch - ${data}`)
    this.setState({
      data: data
    });
    
  }

  render() {

    return (
      <div className="App">
        <SearchPage handleSearch={() => this.handleSearch(document.getElementById("search").value)}/>
        <ContentPage data={this.state.data} />
      </div>
    );

  }

}

export default App;

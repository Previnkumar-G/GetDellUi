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
    <div className="content" id={props.id}>
      <a href={props.url} target="_blank">
        <p>{props.url}</p>
        <h4>{props.title}</h4>
        <p>{props.summary}</p>
      </a>
    </div>
  )

}

function ContentPage(props) {

  const list = []
  if (props.isLoading === false)
  {
    for (let i=0; i<props.data.length; i++){
      list.push(
        <Content 
          key={i}
          url={props.data[i].url} 
          title={props.data[i].title} 
          summary={props.data[i].summary}
        />
      )
    }

    return (
      <div className='content-page animate-bottom'>
        {list}
      </div>
    )

  } else {
      return <div className="loader"></div>
  }

}

async function search(searchTerm) {

  const response = await fetch(`http://10.107.115.39:8009/godell_search_engine?` + new URLSearchParams({searchTerm: searchTerm}), {
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
      data: [] ,
      isLoading: false
    };

  }

  async handleSearch(searchTerm) {

    this.setState({
      isLoading: true,
      data: this.state.data
    })
    const data = await search(searchTerm)
    console.log(`in handlesearch - ${data}`)
    this.setState({
      data: data,
      isLoading: false
    });
    
  }

  render() {

    return (
      <div className="App">
        <SearchPage handleSearch={() => this.handleSearch(document.getElementById("search").value)}/>
        <ContentPage data={this.state.data} isLoading={this.state.isLoading}/>
      </div>
    );

  }

}

export default App;

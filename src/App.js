// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'

export default class App extends Component {
  pageSizeno = 10;
  countryselected = "in";

  // process.env is used to fetch enviroment variables

  apiKey = process.env.REACT_APP_NEWS_API;
  state = {progress: 0}
setProgress =(status)=>{
this.setState({progress:status})
}

  render() {
    return (
      <div className="App">
        <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => this.setProgress(0)}
      />
        <Routes>
          {/* since componentdidmount wont re-render since the render component is exactly same, we provide unique "key" prop to make each 
          component re-render is unique in this way the componentdidmount will understand the developer is trying to render same component uniquely 
          along with updated props. This method is called component force remount */}
          <Route exact path="/" element={<NewsContainer apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSizeno} country={this.countryselected} category="general" />} />
          <Route exact path="/business" element={<NewsContainer apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSizeno} country={this.countryselected} category="business" />} />
          <Route exact path="/entertainment" element={<NewsContainer apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSizeno} country={this.countryselected} category="entertainment" />} />
          <Route exact path="/health" element={<NewsContainer apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSizeno} country={this.countryselected} category="health" />} />
          <Route exact path="/science" element={<NewsContainer apiKey={this.apiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSizeno} country={this.countryselected} category="science" />} />
          <Route exact path="/sports" element={<NewsContainer apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSizeno} country={this.countryselected} category="sports" />} />
          <Route exact path="/technology" element={<NewsContainer apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSizeno} country={this.countryselected} category="technology" />} />
        </Routes>

      </Router>
      </div>
    )
  }
}




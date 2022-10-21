import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import HatForm from './HatForm';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      hats: [],
    };
    this.loadHats = this.loadHats.bind(this);
    this.deleteHat = this.deleteHat.bind(this);
  }

  async componentDidMount() {
    this.loadHats()
  }

  async loadHats() {
    const response = await fetch("http://localhost:8090/api/hats");
    if(response.ok) {
      const data = await response.json();
      this.setState({hats: data.hats});
    }
  }

  async deleteHat (hat) {
    if (window.confirm("Are you sure you want to delete this?")) {
      const hatUrl = `http://localhost:8090/api/hats/${hat.id}/`
      const fetchConfig = {
        method: 'delete',
      }
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
      const newHats = this.state.hats.filter((h) => hat.id != h.id)
      this.setState({hats: newHats})
    }
    }
  }

  render() {
    return(
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="home" element={<MainPage />} />
            <Route index element={<MainPage />} />
          <Route path="hats" element={<HatList hats={this.state.hats} delete={this.deleteHat}/>} />
          <Route path="hats">
            <Route path="new" element={<HatForm hats={this.state.hats}/>} />
          </Route>
        </Routes>
    </BrowserRouter>
    );
  }
}

export default App;

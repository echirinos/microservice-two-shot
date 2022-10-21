import React from 'react';

class CreateHat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style_name: '',
      fabric: '',
      color: '',
      picture_url: '',
      locations: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8090/api/locations/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      this.setState({ locations: data.locations })
    }
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state }
    delete data.locations
    console.log(data)

    const hatURL = 'http://localhost:8090/api/hats/'
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const response = await fetch(hatURL, fetchConfig)
    if (response.ok) {
      const newHat = await response.json()
      console.log(newHat)
      const cleared = {
        style_name: '',
        fabric: '',
        color: '',
        picture_url: '',
        location: "",
      }
      this.setState(cleared)
    }
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new hat</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="style_name" name="style_name" value={this.state.style_name} placeholder="Style Name" onChange={this.handleChange} />
                <label htmlFor="style_name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="fabric" name="fabric" value={this.state.fabric} placeholder="Fabric" onChange={this.handleChange} />
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="color" name="color" value={this.state.color} placeholder="Color" onChange={this.handleChange} />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="picture_url" name="picture_url" value={this.state.picture_url} placeholder="Picture URL" onChange={this.handleChange} />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.location} name="location" required id="location" className="form-select">
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                    return <option key={location.id} value={location.id}>{location.closet_name} </option>
                  })}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

export default CreateHat;

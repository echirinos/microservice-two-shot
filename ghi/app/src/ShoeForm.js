import React from 'react';

class ShoeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: '',
      name: '',
      color: '',
      picture_url: '',
      bin: '',
      bins: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/bins/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      this.setState({ bins: data.bins })
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
    delete data.bins
    console.log(data)

    const shoeURL = 'http://localhost:8080/api/shoes/'
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const response = await fetch(shoeURL, fetchConfig)
    if (response.ok) {
      const newShoe = await response.json()
      console.log(newShoe)
      const cleared = {
        manufacturer: '',
        name: '',
        color: '',
        picture_url: '',
        bin: "",
      }
      this.setState(cleared)
    }
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new shoe</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                <input placeholder="Manufacturer" type="text" className="form-control" id="manufacturer" name="manufacturer" value={this.state.manufacturer} onChange={this.handleChange} />
                <label htmlFor="manufacturer">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Model Name" type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                <label htmlFor="name">Model Name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Color" type="text" className="form-control" id="color" name="color" value={this.state.color} onChange={this.handleChange} />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Picture URL" type="text" className="form-control" id="picture_url" name="picture_url" value={this.state.picture_url} onChange={this.handleChange} />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChange} value={this.state.bin} name="bin" required id="bin" className="form-select">
                  <option value="">Bin</option>
                  {this.state.bins.map(bin => {
                    return <option key={bin.id} value={bin.id}>{bin.closet_name}</option>
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

export default ShoeForm;

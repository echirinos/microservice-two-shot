import React from "react";
import Link from "react-router-dom";

class ShoesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {shoes: []}

    this.deleteShoe = this.deleteShoe.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/api/shoes/')
    if (response.ok) {
      const data = await response.json()
      this.setState({ shoes: data.shoes })
    }
  }

  async deleteShoe(shoe) {
    const deleteUrl = `http://localhost:8080/api/shoes/${shoe.id}`
    const fetchConfig = {
      method: "delete"
    }
    await fetch(deleteUrl, fetchConfig)

    const idx = this.state.shoes.indexOf(shoe)
    const updated_shoes = [...this.state.shoes]
    updated_shoes.splice(idx, 1)
    this.setState({ shoes: updated_shoes })
  }

  render() {
    return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Manufacturer</th>
              <th>Model Name</th>
              <th>Color</th>
              <th>Bin</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.shoes.map(shoe => {
              return (
                <tr key={shoe.id}>
                  <td><img src={shoe.picture_url} width="300" /></td>
                  <td>{shoe.manufacturer}</td>
                  <td>{shoe.name}</td>
                  <td>{shoe.color}</td>
                  <td>{shoe.bin.closet_name} - {shoe.bin.bin_number}/{shoe.bin.bin_size}</td>
                  <td><button className="btn btn-danger" onClick={() => this.deleteShoe(shoe)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
    )
  }
}

export default ShoesList

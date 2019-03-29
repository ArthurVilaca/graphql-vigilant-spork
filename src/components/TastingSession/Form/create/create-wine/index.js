import React, { Component } from "react";
import { Mutation } from "react-apollo";

import styles from './create-wine.module.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import CREATE_WINE from "../../../../../graphql/mutations/CREATE_WINE";
import WINES from "../../../../../graphql/queries/WINES";

class CreateWine extends Component {
  state = {
    isOpen: false,
    name: "",
    grapes: [],
    winery: "",
    year: undefined,
    alcohol: undefined,
    price: undefined,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleChange = name => event => {
    let { value } = event.target;

    if (name === "price" || name === "year" || name === "alcohol")
      value = Number(value);

    this.setState({ [name]: value });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      grapes: value,
    });
  };

  render() {
    const { isOpen, name, grapes, winery, year, alcohol, price } = this.state;
    return (
      <div>
        <button onClick={this.toggle}>Create New Wine</button>

        {isOpen ? (
          <div className={styles.section}>

            <TextField
              className={styles.textField}
              label="Name"
              value={name}
              onChange={this.handleChange('name')}
              margin="normal"
            />

            <FormControl>
              <InputLabel shrink htmlFor="select-multiple-native">
                Grapes
              </InputLabel>
              <Select
                multiple
                native
                value={grapes}
                onChange={this.handleChangeMultiple}
                inputProps={{
                  id: 'select-multiple-native',
                }}
              >
                <option value="GEWURZTRAMINER">GEWURZTRAMINER</option>
                <option value="CHARDONNAY">CHARDONNAY</option>
                <option value="SAUVIGNON_BLANC">SAUVIGNON BLANC</option>
                <option value="SYRAH">SYRAH</option>
                <option value="MERLOT">MERLOT</option>
                <option value="CABERNET_SAUVIGNON">CABERNET SAUVIGNON</option>
                <option value="PINOT_NOIR">PINOT NOIR</option>
              </Select>
            </FormControl>

            <TextField
              className={styles.textField}
              label="Winery"
              value={winery}
              onChange={this.handleChange('winery')}
              margin="normal"
            />

            <TextField
              className={styles.textField}
              label="Year"
              type="number"
              value={year}
              onChange={this.handleChange('year')}
              margin="normal"
            />

            <TextField
              className={styles.textField}
              label="alcohol"
              type="number"
              value={alcohol}
              onChange={this.handleChange('alcohol')}
              margin="normal"
            />

            <TextField
              className={styles.textField}
              label="price"
              type="number"
              value={price}
              onChange={this.handleChange('price')}
              margin="normal"
            />

            <Mutation
              mutation={CREATE_WINE}
              update={(cache, { data: { createWine } }) => {
                const { wines } = cache.readQuery({ query: WINES });
                cache.writeQuery({
                  query: WINES,
                  data: { wines: wines.concat([createWine]) },
                });
              }}
              variables={{
                name,
                grapes,
                winery,
                year,
                alcohol,
                price,
              }}
              onCompleted={() =>
                this.setState({
                  isOpen: false,
                  name: "",
                  grapes: [],
                  winery: "",
                  year: undefined,
                  alcohol: undefined,
                  price: undefined,
                })
              }
            >
              {postMutation =>
                <Button variant="contained" color="primary" size="small" onClick={postMutation} >Submit</Button>
              }
            </Mutation>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CreateWine;

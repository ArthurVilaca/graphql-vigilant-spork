import React, { Component } from "react";
import { Mutation } from "react-apollo";

import styles from './create-wine.module.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import ListWines from "../../lists/list-wines";

import WINE_TASTERS from "../../../../../graphql/queries/WINE_TASTERS";
import CREATE_WINE_TASTER from "../../../../../graphql/mutations/CREATE_WINE_TASTER";

class CreateWineTaster extends Component {
  state = {
    isOpen: false,
    name: "",
    nationality: "",
    gender: "MALE",
    age: undefined,
    favouriteWine: undefined,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "number") value = Number(value);
    this.setState({ [name]: value });
  };

  handleChange = name => event => {
    let { value } = event.target;

    if (name === "number")
      value = Number(value);

    this.setState({ [name]: value });
  };

  render() {
    const {
      isOpen,
      name,
      nationality,
      gender,
      age,
      favouriteWine,
    } = this.state;
    return (
      <div>
        <button onClick={this.toggle}>Create New Wine Taster</button>

        {isOpen ? (
          <div className={styles.section}>

            <TextField
              className={styles.textField}
              label="Name"
              value={name}
              onChange={this.handleChange('name')}
              margin="normal"
            />

            <TextField
              className={styles.textField}
              label="nationality"
              value={nationality}
              onChange={this.handleChange('nationality')}
              margin="normal"
            />

            <Select
              name="gender"
              value={gender}
              onChange={e => this.setState({ gender: e.target.value })}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </Select>

            <TextField
              className={styles.textField}
              label="age"
              value={age}
              onChange={e => this.setState({ age: Number(e.target.value) })}
              margin="normal"
              type="number"
            />

            <ListWines
              childCB={id => this.setState({ favouriteWine: id })}
              placeholder="Favourite Wine"
            />
            <Mutation
              mutation={CREATE_WINE_TASTER}
              update={(cache, { data: { createWineTaster } }) => {
                const { wineTasters } = cache.readQuery({
                  query: WINE_TASTERS,
                });
                cache.writeQuery({
                  query: WINE_TASTERS,
                  data: { wineTasters: wineTasters.concat([createWineTaster]) },
                });
              }}
              variables={{
                name,
                nationality,
                gender,
                age,
                favouriteWine,
              }}
              onCompleted={() =>
                this.setState({
                  isOpen: false,
                  name: "",
                  nationality: "",
                  gender: "MALE",
                  age: undefined,
                  favouriteWine: undefined,
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

export default CreateWineTaster;

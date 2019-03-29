import React, { Component } from "react";
import { Mutation } from "react-apollo";

import styles from './create-review.module.css';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import CREATE_REVIEW from "../../../../../graphql/mutations/CREATE_REVIEW";

class CreateReview extends Component {
  state = {
    score: undefined,
    tastingNotes: [],
    predictedPrice: undefined,
    predictedYear: undefined,
  };

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "tastingNotes") {
      this.setState({
        tastingNotes: [...e.target.selectedOptions].map(o => o.value),
      });
    } else {
      if (name === "score") value = Number(value);
      this.setState({ [name]: value });
    }
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
      tastingNotes: value,
    });
  };

  render() {
    const { score, tastingNotes, predictedPrice, predictedYear } = this.state;
    const { wineTaster, wine, tastingSession } = this.props;
    return (
      <div>
        <div className={styles.section}>
          <h5>{this.props.wine}</h5>

          <TextField
            className={styles.textField}
            label="score"
            value={score}
            onChange={this.inputHandler}
            type="number"
            margin="normal"
          />

          <TextField
            className={styles.textField}
            label="predictedPrice"
            value={predictedPrice}
            onChange={this.inputHandler}
            type="number"
            margin="normal"
          />

          <TextField
            className={styles.textField}
            label="predictedYear"
            value={predictedYear}
            onChange={this.inputHandler}
            type="number"
            margin="normal"
          />

          <FormControl>
            <InputLabel shrink htmlFor="select-multiple-native">
              tastingNotes
              </InputLabel>
            <Select
              multiple
              native
              value={tastingNotes}
              onChange={this.handleChangeMultiple}
              inputProps={{
                id: 'select-multiple-native',
              }}
            >
              <option value="ACIDIC">ACIDIC</option>
              <option value="BARNYARD">BARNYARD</option>
              <option value="BRIGHT">BRIGHT</option>
              <option value="BUTTERY">BUTTERY</option>
              <option value="COMPLEX">COMPLEX</option>
              <option value="CRISP">CRISP</option>
              <option value="EARTHY">EARTHY</option>
              <option value="OAKED">OAKED</option>
              <option value="JUICY">JUICY</option>
            </Select>
          </FormControl>

        </div>
        <Mutation
          mutation={CREATE_REVIEW}
          variables={{
            wine,
            wineTaster,
            tastingSession,
            score,
            tastingNotes,
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateReview;

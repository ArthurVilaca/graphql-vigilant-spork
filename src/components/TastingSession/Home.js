import React, { Component } from "react";
import { Mutation } from "react-apollo";

import CreateTastingSession from "./Form/create/create-tasting-session";
import ListTastingSessions from "./Form/lists/tasting-sessions";

import CREATE_TASTING_SESSION from "../../graphql/mutations/CREATE_TASTING_SESSION";
import LOCAL_TASTING_SESSION from "../../graphql/queries/LOCAL_TASTING_SESSION";

import Button from '@material-ui/core/Button';

import styles from './Home.module.css';

class Home extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <Mutation
          variables={{
            date: new Date()
          }}
          onCompleted={() => {
            this.setState({
              isOpen: true,
            });
          }}
          mutation={CREATE_TASTING_SESSION}
          update={(cache, { data }) => {
            const localData = cache.readQuery({ query: LOCAL_TASTING_SESSION });
            cache.writeQuery({
              query: LOCAL_TASTING_SESSION,
              data: { ...localData, sessionID: data.createTastingSession.id },
            });
          }}
        >
          {postMutation => (
            <Button
              className={styles.section}
              variant="contained"
              color="primary"
              size="small"
              onClick={isOpen ? null : postMutation}
            >Create New Tasting Session</Button>
          )}
        </Mutation>
        {isOpen ? <CreateTastingSession toggle={this.toggle} /> : <ListTastingSessions />}
      </React.Fragment>
    );
  }
}

export default Home;

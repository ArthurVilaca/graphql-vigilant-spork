import React from "react";
import { graphql, compose, Query, withApollo } from "react-apollo";
import moment from 'moment'

import styles from './tasting-sessions.module.css'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import ALL_TASTING_SESSION from "../../../../../graphql/queries/ALL_TASTING_SESSION";
import DELETE_TASTING_SESSION from "../../../../../graphql/mutations/DELETE_TASTING_SESSION";

const ListTastingSessions = props => {
  return (
    <Query query={ALL_TASTING_SESSION}>
      {({ loading, error, data }) => {
        if (loading) return "LOADING";
        if (error) return `Error! ${error.message}`;
        const { tastingSessions } = data;

        return (
          <div>
            {
              tastingSessions.map(session => {
                return (
                  <Card key={session.id} className={styles.card}>
                    <CardContent>
                      <p>ID: {session.id}</p>
                      <p>DATE: {session.date ? moment(session.date).format("MMM Do YY") : ''}</p>

                      {
                        session.wines.map(wine => {
                          return (
                            <p>WINE: {wine.name}</p>
                          )
                        })
                      }

                      {
                        session.wineTasters.map(taster => {
                          return (
                            <p>TASTER: {taster.name}</p>
                          )
                        })
                      }

                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="primary" size="small" disabled >Update</Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => {
                          props.deleteTastingSession({
                            variables: { id: session.id },
                          });
                          console.log(props)
                        }}>Delete</Button>
                    </CardActions>
                  </Card>
                )
              })
            }
            <div>

            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default compose(graphql(DELETE_TASTING_SESSION, { name: "deleteTastingSession" }))(ListTastingSessions);
// export default withApollo(compose(graphql(DELETE_TASTING_SESSION, { name: "deleteTastingSession" })))(ListTastingSessions);

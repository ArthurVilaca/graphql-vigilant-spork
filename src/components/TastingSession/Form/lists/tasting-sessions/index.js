import React from "react";
import { Query, Mutation, compose, withApollo } from "react-apollo";
import moment from 'moment'

import styles from './tasting-sessions.module.css'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import ALL_TASTING_SESSION from "../../../../../graphql/queries/ALL_TASTING_SESSION";
import DELETE_TASTING_SESSION from "../../../../../graphql/mutations/DELETE_TASTING_SESSION";
import LOCAL_TASTING_SESSION from "../../../../../graphql/queries/LOCAL_TASTING_SESSION";

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
              tastingSessions.map((session, idx) => {
                return (
                  <Card key={session.id} className={styles.card}>
                    <CardContent>
                      <p>ID: {session.id}</p>
                      <p>DATE: {session.date ? moment(session.date).format("MMM Do YY") : ''}</p>

                      {
                        session.wines.map((wine, id) => {
                          return (
                            <p key={id}>WINE: {wine.name}</p>
                          )
                        })
                      }

                      {
                        session.wineTasters.map((taster, id) => {
                          return (
                            <p key={id}>TASTER: {taster.name}</p>
                          )
                        })
                      }

                    </CardContent>
                    <CardActions>

                      <Button
                        className={styles.section}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                          props.client.cache.writeQuery({
                            query: LOCAL_TASTING_SESSION,
                            data: { ...session, sessionID: session.id,
                              sessionWines: session.wines,
                              sessionWineTasters: session.wineTasters,
                              sessionReviews: session.reviews
                            }
                          });
                          props.toggle()
                        }}
                      >Update</Button>

                      <Mutation
                        variables={{
                          id: session.id
                        }}
                        mutation={DELETE_TASTING_SESSION}
                        update={(cache, { data }) => {
                          const { tastingSessions } = cache.readQuery({ query: ALL_TASTING_SESSION });
                          tastingSessions.splice(idx, 1)
                          cache.writeQuery({
                            query: ALL_TASTING_SESSION,
                            data: { tastingSessions: tastingSessions },
                          });
                        }}
                      >
                        {postMutation => (
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={postMutation}>
                            Delete</Button>
                        )}
                      </Mutation>

                    </CardActions>
                  </Card>
                )
              })
            }

          </div>
        );
      }}
    </Query>
  );
};

// export default compose(graphql(DELETE_TASTING_SESSION, { name: "deleteTastingSession" }))(ListTastingSessions);
export default compose(
  withApollo
)(ListTastingSessions);

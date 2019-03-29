import gql from "graphql-tag";
const CREATE_TASTING_SESSION = gql`
  mutation(
    $date: DateTime
  ) {
    createTastingSession(data: {
      date: $date
    }) {
      id
      date
    }
  }
`;

export default CREATE_TASTING_SESSION;

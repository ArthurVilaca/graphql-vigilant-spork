import gql from "graphql-tag";
const ALL_TASTING_SESSION = gql`
  query tastingSessions {
    tastingSessions {
      id
      date
      wines {
        name
      }
      wineTasters {
        name
      }
    }
}
`;

export default ALL_TASTING_SESSION;

import gql from "graphql-tag";
const ALL_TASTING_SESSION = gql`
  query tastingSessions {
    tastingSessions {
      id
      date
      wines {
        id
        name
        grapes
        winery
        year
        alcohol
        price
      }
      wineTasters {
        id
        name
        nationality
        gender
        email
        facebook
        age
        favouriteWine {
          name
        }
      }
      reviews {
        id
        wine {
          id
          name
        }
        wineTaster {
          id
          name
        }
        tastingSession {
          id
        }
        score
        predictedPrice
        predictedYear
        tastingNotes
      }
    }
}
`;

export default ALL_TASTING_SESSION;

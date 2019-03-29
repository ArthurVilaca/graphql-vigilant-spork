import gql from "graphql-tag";
const CREATE_WINE_TASTER = gql`
  mutation createWineTaster(
    $name: String!
    $nationality: String
    $gender: Gender
    $age: Int
    $favouriteWine: ID
    $email: String
    $facebook: String
  ) {
    createWineTaster(
      data: {
        name: $name
        nationality: $nationality
        gender: $gender
        age: $age
        email: $email
        facebook: $facebook
        favouriteWine: { connect: { id: $favouriteWine } }
      }
    ) {
      id
      name
      nationality
      gender
      age
      email
      facebook
      favouriteWine {
        id
        name
        grapes
        winery
        year
        alcohol
        price
      }
      reviews {
        id
      }
    }
  }
`;

export default CREATE_WINE_TASTER;

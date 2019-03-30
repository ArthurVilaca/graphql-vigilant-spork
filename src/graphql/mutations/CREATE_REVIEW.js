import gql from "graphql-tag";
const CREATE_REVIEW = gql`
  mutation createReview(
    $wine: ID
    $wineTaster: ID!
    $tastingSession: ID!
    $score: Int
    $predictedPrice: Float
    $predictedYear: Int
    $tastingNotes: [TastingNotes!]
  ) {
    createReview(
      data: {
        wine: { connect: { id: $wine } }
        wineTaster: { connect: { id: $wineTaster } }
        tastingSession: { connect: { id: $tastingSession } }
        score: $score
        predictedPrice: $predictedPrice
        predictedYear: $predictedYear
        tastingNotes: { set: $tastingNotes }
      }
    ) {
      id
    }
  }
`;

export default CREATE_REVIEW;

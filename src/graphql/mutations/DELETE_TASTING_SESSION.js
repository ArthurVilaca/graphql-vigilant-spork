import gql from "graphql-tag";
const DELETE_TASTING_SESSION = gql`
    mutation deleteTastingSessions(
        $id: ID!
    ) {
        deleteTastingSession (
            where: { id: $id }
        ) {
            date
        }
    }
`;

export default DELETE_TASTING_SESSION;

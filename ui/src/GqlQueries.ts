import gql from "graphql-tag";
export const FETCH_EVENTS_QUERY = gql`
    query {
        events {
            eventId
            title
        }
    }
`;
export const FETCH_PHOTOS_QUERY = gql`
    query photos(
        $eventId: ID
        $commentsPlus: Int
        $likesPlus: Int
        $limit: Int
        $offset: Int
    ) {
        photos(
            options: {
                eventId: $eventId
                commentsPlus: $commentsPlus
                likesPlus: $likesPlus
                limit: $limit
                offset: $offset
            }
        ) {
            total
            photos {
                photoId
                likes
                comments {
                    commentId
                }
                imageUrl
            }
        }
    }
`;
export const DECIDE_WINNER_MUTATION = gql`
    mutation setWinner($photoId: ID!) {
        setWinner(photoId: $photoId) {
            winnerId
            winDate
        }
    }
`;

export const Fetch_User = gql`
    query user_participations($photoId: ID) {
        user_participations(photoId: $photoId) {
            participationDate
            user {
                name
                email
            }
            event {
                title
                priceAmount
            }
        }
    }
`;

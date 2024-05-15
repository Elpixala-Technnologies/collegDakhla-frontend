import { gql } from "@apollo/client";

export const GET_BOARDS = gql`
query Boards {
    boards {
        data {
            id
            attributes {
                board_name
            }
        }
    }
}

`
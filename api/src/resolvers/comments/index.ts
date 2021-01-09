import Mutation from "./mutation";
import CommentResolver from "./CommentResolver";
import Query from "./Query";

const index = {
    Query,
    Mutation,
    Comments: CommentResolver,
};

export default index;

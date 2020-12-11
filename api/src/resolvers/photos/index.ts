import Query from "./Query";
import Mutation from "./Mutation";
import PhotoResolver from './PhotosResolver'

const index = {
    Query,
    Mutation,
    Photos: PhotoResolver
}

export default index;
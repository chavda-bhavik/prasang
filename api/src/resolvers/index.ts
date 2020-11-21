import DemoResolver from './demo/index'
import EventCategoriesResolver from './eventcategories/index'
import EventResolver from './events/index'
// import { GraphQLUpload, FileUpload }  from "graphql-upload"

const index = [
    DemoResolver,
    EventCategoriesResolver,
    EventResolver
]

export default index;
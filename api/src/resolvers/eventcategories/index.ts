import Query from './Query'
import Mutation from './Mutation'
import EventCategoryResolver from './EventCategoryResolver';

const index = {
    Query,
    Mutation,
    EventCategory: EventCategoryResolver
}

export default index;
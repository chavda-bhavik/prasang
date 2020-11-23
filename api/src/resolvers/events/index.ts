import EventResolver from './EventResolver'
import Mutation from './Mutation'
import Query from './Query'

const index = {
    Mutation,
    Query,
    Event: EventResolver
}

export default index
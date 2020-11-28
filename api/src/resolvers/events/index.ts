import EventResolver from './EventResolver'
import Mutation from './Mutation'
import Query from './Query'

const index = {
    Mutation,
    Query,
    Events: EventResolver
}

export default index
import Query from './Query'
import Mutation from './Mutation'
import ParticipationResolver from './ParticipationResolver'

const index = {
    Query,
    Mutation,
    Participations: ParticipationResolver
}

export default index
import Query from './Query'
import Mutation from './Mutation'
import WinnerResolver from './WinnerResolver';

const index = {
    Query,
    Mutation,
    Winner: WinnerResolver
}

export default index;
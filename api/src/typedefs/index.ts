import { mergeTypeDefs } from '@graphql-tools/merge'

import DemoTypeDef from './DemoTypeDefs'
import EventTypeDefs from './EventsTypeDefs'

const types = [
    DemoTypeDef,
    EventTypeDefs
];

export default mergeTypeDefs(types);
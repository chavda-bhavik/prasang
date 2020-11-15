import { mergeTypeDefs } from '@graphql-tools/merge'

import DemoTypeDef from './DemoTypeDefs'
import EventCategoriesTypeDefs from './EventCategoriesTypeDefs'
import EventTypedefs from './EventsTypeDefs'

const types = [
    DemoTypeDef,
    EventCategoriesTypeDefs,
    EventTypedefs
];

export default mergeTypeDefs(types);
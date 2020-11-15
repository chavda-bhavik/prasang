import { mergeTypeDefs } from '@graphql-tools/merge'

import DemoTypeDef from './DemoTypeDefs'
import RoleTypeDefs from './RoleTypeDefs'
import UserTypeDefs from './UserTypeDefs'

const types = [
    DemoTypeDef,
    RoleTypeDefs,
    UserTypeDefs
];
  
export default mergeTypeDefs(types);
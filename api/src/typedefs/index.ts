import { mergeTypeDefs } from '@graphql-tools/merge'

import DemoTypeDef from './DemoTypeDefs'

const types = [
    DemoTypeDef
];
  
export default mergeTypeDefs(types);
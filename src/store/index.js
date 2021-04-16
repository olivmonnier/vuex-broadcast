import opts from './opts'
import { wrap } from "../lib"
import StoreWorker from './worker?worker'

export default wrap(opts, new StoreWorker({ type: 'module'}))
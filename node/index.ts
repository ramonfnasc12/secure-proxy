import { PaymentProviderService } from '@vtex/payment-provider'

import TestSuiteApprover from './connector'

import { Clients
} from './clients'
import { ClientsConfig, ServiceContext } from '@vtex/api'
const TIMEOUT_MS = 15000

const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 4,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>
}

export default new PaymentProviderService({
  clients,
  connector: TestSuiteApprover,
})

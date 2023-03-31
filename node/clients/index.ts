import { IOClients } from '@vtex/api'

import SecureExternal from './Secure External'
import { VtexClient } from './vtex'

export class Clients extends IOClients {

  public get vtexClient() {
    return this.getOrSet('vtexClient', VtexClient)
  }

  public get secureExternal() {
    return this.getOrSet(
      'secureExternal', SecureExternal
    )
  }


}
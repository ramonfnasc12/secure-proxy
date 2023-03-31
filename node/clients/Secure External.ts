import type { InstanceOptions, IOContext, RequestConfig } from '@vtex/api'
import { SecureExternalClient } from '@vtex/payment-provider'
import { extractHeaders } from '../utils/headers'

export default class SecureExternal
    extends SecureExternalClient {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(context: IOContext, options?: InstanceOptions) {
        super("https://office-server.test.sips-services.com/", context, options)
    }


    public CardCheckEnrollment = (endpoint: string, cardRequest: any, headers: any, secureProxyUrl: any) => {
        const vtexHeaders = extractHeaders(headers)

        return this.http.post(
            endpoint,
            cardRequest,
            { headers: this.headers(vtexHeaders.appToken), secureProxy: secureProxyUrl } as RequestConfig
        )
    }

    private headers(token: string, paymentToken?: string) {
        if (paymentToken) {
          return {
            ...this.options?.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            paymentToken,
          }
        }
    
        return {
          ...this.options?.headers,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }


}
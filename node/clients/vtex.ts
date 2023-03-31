import { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import type { AuthorizationResponse } from '@vtex/payment-provider'
import { constants, WorkflowTypes } from '../shared/constants'

import type {
    SecureProxyTokensResponse,
  TransactionDetail,
  VtexRequestProxyHeaders,
} from '../typings/vtex'

export class VtexClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true',
        'Content-Type': 'application/json',
        vtexIdClientAutCookie: context.authToken,
      },
    })
  }

  public async getOrder(orderId: string): Promise<VtexOrder | undefined> {
    const { logger } = this.context
    const baseUrl = `http://${this.context.account}.vtexcommercestable.com.br/api`

    try {
      const order = await this.http.get(
        `${baseUrl}/oms/pvt/orders/${orderId}-01`
      )

      logger.info({
        workflowType: WorkflowTypes.PAYMENT,
        workflowInstance: 'VtexClient.getOrder',
        message: 'getting vtex order',
        data: JSON.stringify({
          request: JSON.stringify({
            url: `${baseUrl}/oms/pvt/orders/${orderId}-01`,
          }),
          response: JSON.stringify(order),
        }),
      })

      return order
    } catch (err) {
      logger.error({
        workflowType: WorkflowTypes.PAYMENT,
        workflowInstance: 'VtexClient.getOrderForm',
        message: 'Error getting vtex order',
        exception: err,
      } as LoggerMessage)

      return undefined
      //throw err
    }
  }

  /* eslint max-params: ["error", 4] */
  public async secureProxy(
    url: string,
    body: any, // CreateTokenRequestPayload,
    headers: VtexRequestProxyHeaders,
    workflowType: WorkflowTypes
  ): Promise<any> {
    const { logger } = this.context

    try {
      const rawResponse = await this.http.post(url, body, {
        headers,
      })

      return rawResponse
    } catch (err) {
      console.error('Error VtexClient.callback Token')
      logger.error({
        workflowType,
        workflowInstance: 'VtexClient.callback SecureProxy',
        message: 'Error executing vtex callback SecureProxy',
        data: { Request: body, Response: err.response.data },
        exception: err,
      } as LoggerMessage)
    }
  }

  public async createTokens(
    url: string,
    payload : string
  ): Promise<SecureProxyTokensResponse> {

    try {
      const tokens = await this.http.post<SecureProxyTokensResponse>(
        url,
        payload
      )

      return tokens
    } catch (err) {

      throw err
    }
  }

  public async getTokens(
    url: string,
  ): Promise<SecureProxyTokensResponse> {

    try {
      const tokens = await this.http.get<SecureProxyTokensResponse>(
        url
      )

      return tokens
    } catch (err) {

      throw err
    }
  }

  public async getPaymentDetails(
    transactionId: string,
    paymentId : string
  ): Promise<TransactionDetail> {
    const { logger } = this.context
    const baseUrl = `http://${this.context.account}.vtexpayments.com.br/api`

    try {
      const payment = await this.http.get(
        `${baseUrl}/pvt/transactions/${transactionId}/payments/${paymentId}`
      )

      logger.info({
        workflowType: WorkflowTypes.PAYMENT,
        workflowInstance: 'VtexClient.getPaymentDetails',
        message: 'getting vtex payment details',
        data: JSON.stringify({
          request: JSON.stringify({
            url: `${baseUrl}/pvt/transactions/${transactionId}/payments/${paymentId}`,
          }),
          response: JSON.stringify(payment),
        }),
      })

      return payment
    } catch (err) {
      logger.error({
        workflowType: WorkflowTypes.PAYMENT,
        workflowInstance: 'VtexClient.getPaymentDetails',
        message: 'Error getting vtex payment details',
        exception: err,
      } as LoggerMessage)

      throw err
    }
  }

  public async getTransactionDetails(
    transactionId: string
  ): Promise<Transaction> {
    const { logger } = this.context
    const baseUrl = `http://${this.context.account}.vtexpayments.com.br/api`

    try {
      const transaction = await this.http.get(
        `${baseUrl}/pvt/transactions/${transactionId}`
      )

      logger.info({
        workflowType: WorkflowTypes.PAYMENT,
        workflowInstance: 'VtexClient.getTransaction',
        message: 'getting vtex transaction',
        data: JSON.stringify({
          request: JSON.stringify({
            url: `${baseUrl}/pvt/transactions/${transactionId}`,
          }),
          response: JSON.stringify(transaction),
        }),
      })

      return transaction
    } catch (err) {
      logger.error({
        workflowType: WorkflowTypes.PAYMENT,
        workflowInstance: 'VtexClient.getTransaction',
        message: 'Error getting vtex transaction',
        exception: err,
      } as LoggerMessage)

      throw err
    }
  }

  public callback = async (
    paymentId: string,
    workflowType: WorkflowTypes,
    url: string,
    ctx: Context
  ) => {
    const { logger } = this.context
    const {
      clients: { vbase },
    } = ctx

    let body: Partial<AuthorizationResponse> | null = null

    console.log(vbase)
    
    try {
     
      body = {
        paymentId,
        nsu: '',
        tid: '',
        authorizationId: '',
        status: 'approved',
        delayToCancel: constants.DELAY_TO_CANCEL,
        delayToAutoSettle: constants.DELAY_TO_AUTOSETTLE,
        delayToAutoSettleAfterAntifraud: constants.DELAY_TO_AUTOSETTLE,
      }

      const callbackUrl = url.replace('https', 'http')

      console.info('callbackUrl', callbackUrl)

      logger.info({
        workflowType,
        workflowInstance: 'VtexClient.callback',
        message: `Url Callback ${callbackUrl}`,
        exception: '',
      } as LoggerMessage)

      // fire and Forget to avoid locks
      this.http.post(callbackUrl, body)
    } catch (err) {
      console.error('Error VtexClient.callback: ', err.message)

      logger.error({
        workflowType,
        workflowInstance: 'VtexClient.callback',
        message: 'Error executing vtex callback',
        exception: err,
        data: {
          resquest: body,
          response: err.response.data,
        },
      } as LoggerMessage)
    }
  }
}
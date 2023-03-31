import {
  AuthorizationRequest,
  AuthorizationResponse,
  CancellationRequest,
  CancellationResponse,
  Cancellations,
  Authorizations,
  isCreditCardAuthorization,
  isTokenizedCard,
  PaymentProvider,
  RefundRequest,
  RefundResponse,
  Refunds,
  SettlementRequest,
  SettlementResponse,
  Settlements
} from '@vtex/payment-provider'
import { VBase } from '@vtex/api'
const crypto = require('crypto')
import { randomString } from './utils'
import { Clients } from './clients'
import { constants } from './shared/constants'
import convertInCents from './utils/convertInCents'


interface CardCheckEnrollment {
  amount: string, //"1000"
  captureDay: string,
  captureMode: string,
  cardCSCValue: string,
  cardExpiryDate: string,
  cardNumber: string,
  currencyCode: string,
  customerContact: {
    email: string
  },
  customerIpAddress: string,
  fraudData: {
    challengeMode3DS: string
  },
  interfaceVersion: string, //"IR_WS_2.9",
  intermediateServiceProviderId: string, // STORE_CODE
  keyVersion: string, //"1",
  merchantId: string, //"011223344550000",
  merchantUrl: string,
  orderChannel: string,//"INTERNET",
  orderId: string,//"1234",
  panType: string,
  paymentMeanBrand: string,
  returnContext: string, // "ReturnContext"
  transactionOrigin: string, // "INTERNET"
  transactionReference: string,//"TREFEXA2015",
  seal: string,//"607083393a51b4b23261270df83c28a61e06f74928bc1e868c0abb9325dde2f2"
}

const authorizationsBucket = 'authorizations'

const getPersistedAuthorizationResponse = async (
  vbase: VBase,
  req: AuthorizationRequest
) =>
  vbase.getJSON<AuthorizationResponse | undefined>(
    authorizationsBucket,
    req.paymentId,
    true
  )

export default class TestSuiteApprover extends PaymentProvider<Clients> {
  // This class needs modifications to pass the test suit.
  // Refer to https://help.vtex.com/en/tutorial/payment-provider-protocol#4-testing
  // in order to learn about the protocol and make the according changes.

  public async authorize(
    authorization: AuthorizationRequest
  ): Promise<AuthorizationResponse> {

    const {
      vtex: { workspace, account },
      headers
    } = this.context

    const persistedResponse = await getPersistedAuthorizationResponse(
      this.context.clients.vbase,
      authorization
    )

    if (persistedResponse !== undefined && persistedResponse !== null) {
      return persistedResponse
    }

    if (isCreditCardAuthorization(authorization) && isTokenizedCard(authorization.card)) {

      let amount = convertInCents(authorization.value).toString()
      let email = authorization.miniCart.buyer.email ?? ''
      let customerContact: WorldLineRequests.CustomerContract = {
        email,
      }
      console.log('customerContact', customerContact)
      let orderId = `${authorization.orderId}`
      let transactionReference = `${authorization.paymentId.replace('-', '').replace('-', '').replace('-', '').replace('-', '').toUpperCase()}`
      let paymentId = transactionReference


      let cardCheckEnrollment: CardCheckEnrollment = {
        amount,
        captureDay: constants.CAPTURE_DAY,
        captureMode: constants.CAPTURE_MODE,
        cardCSCValue: authorization.card.cscToken,
        cardExpiryDate: `${authorization.card.expiration.year}${authorization.card.expiration.month}`,
        cardNumber: authorization.card.numberToken,
        currencyCode: constants.CURRENCY_CODE,
        customerContact,
        customerIpAddress: authorization.ipAddress ?? '',
        fraudData: {
          challengeMode3DS: "NO_PREFERENCE"
        },
        interfaceVersion: "IR_WS_2.48",
        intermediateServiceProviderId: "OTAREFONTECASINO",
        keyVersion: "1",
        merchantId: "201000197920001",
        merchantUrl: `https://${workspace}--${account}.myvtex.com/_v/casinofr.ppp-worldline/v0/payments/${paymentId}/return`,
        orderChannel: 'INTERNET',
        orderId,
        panType: "PAN",
        paymentMeanBrand: "AMEX",
        returnContext: 'ReturnContext',
        transactionOrigin: 'SO_WEBAPPLI',
        transactionReference,
        seal: ''
      }

      let textToHash = `${cardCheckEnrollment.amount}${cardCheckEnrollment.captureDay}${cardCheckEnrollment.captureMode}1234${cardCheckEnrollment.cardExpiryDate}375705004001005${cardCheckEnrollment.currencyCode}${email}${cardCheckEnrollment.customerIpAddress}NO_PREFERENCE${cardCheckEnrollment.interfaceVersion}${cardCheckEnrollment.intermediateServiceProviderId}${cardCheckEnrollment.merchantId}${cardCheckEnrollment.merchantUrl}${cardCheckEnrollment.orderChannel}${cardCheckEnrollment.orderId}PANAMEX${cardCheckEnrollment.returnContext}${cardCheckEnrollment.transactionOrigin}${transactionReference}`
      let hash = crypto.createHmac('sha256','BeFTD_Vz6BGKPOA8e4xMCkOomgfpUjFMyfHDQawPXCQ').update(textToHash).digest('hex')
      console.log("textToHash", textToHash)
      console.log("hash", hash)

      let tokenRequest = {
        "tokens": [
          {
            "name": "sealToken",
            "value": {
              "hmac-sha256": [
                'BeFTD_Vz6BGKPOA8e4xMCkOomgfpUjFMyfHDQawPXCQ',
                {
                  "cat": [
                    `${cardCheckEnrollment.amount}${cardCheckEnrollment.captureDay}${cardCheckEnrollment.captureMode}`,
                    {
                      "replaceTokens": [
                        `${cardCheckEnrollment.cardCSCValue}`
                      ]
                    },
                    `${cardCheckEnrollment.cardExpiryDate}`,
                    {
                      "replaceTokens": [
                        `${cardCheckEnrollment.cardNumber}`
                      ]
                    },
                    `${cardCheckEnrollment.currencyCode}${email}${cardCheckEnrollment.customerIpAddress}NO_PREFERENCE${cardCheckEnrollment.interfaceVersion}${cardCheckEnrollment.intermediateServiceProviderId}${cardCheckEnrollment.merchantId}${cardCheckEnrollment.merchantUrl}${cardCheckEnrollment.orderChannel}${cardCheckEnrollment.orderId}PANAMEX${cardCheckEnrollment.returnContext}${cardCheckEnrollment.transactionOrigin}${transactionReference}`
                  ]
                },
                "hex"
              ]
            }
          }
        ]
      }

      console.log(tokenRequest.tokens[0].value['hmac-sha256'][1])
      // tokenRequest = {
      //   "tokens": [
      //     {
      //       "name": "sealToken",
      //       "value": hash
      //     }
      //   ]
      // }
      //@ts-expect-error
      const tokensReturn = await this.context.clients.vtexClient.createTokens(authorization.secureProxyTokensUrl, tokenRequest)
      
      console.log(tokensReturn)
      //@ts-expect-error
      console.log(authorization.secureProxyTokensUrl)
      console.log(authorization.secureProxyUrl)

      const sealToken = tokensReturn.tokens.find(token => {
        return token.name==='sealToken'
      })
      console.log(sealToken)
      let seal = sealToken?.placeholder
      console.log(seal)

      //seal = hash
      cardCheckEnrollment.seal = seal || ''
      console.log(cardCheckEnrollment)

      let response = await this.context.clients.secureExternal.CardCheckEnrollment('rs-services/v2/checkout/cardCheckEnrollment', cardCheckEnrollment, headers, authorization.secureProxyUrl)

      console.log(response)

      return Authorizations.deny(authorization,{
      })
    }

    return Authorizations.deny(authorization,{
      authorizationId: "1233",
      tid: "12343",
      message: "12334"
    })

  }


  public async cancel(
    cancellation: CancellationRequest
  ): Promise<CancellationResponse> {
    if (this.isTestSuite) {
      return Cancellations.approve(cancellation, {
        cancellationId: randomString(),
      })
    }

    throw new Error('Not implemented')
  }

  public async refund(refund: RefundRequest): Promise<RefundResponse> {
    if (this.isTestSuite) {
      return Refunds.deny(refund)
    }

    throw new Error('Not implemented')
  }

  public async settle(
    settlement: SettlementRequest
  ): Promise<SettlementResponse> {
    if (this.isTestSuite) {
      return Settlements.deny(settlement)
    }

    throw new Error('Not implemented')
  }

  public inbound: undefined
}

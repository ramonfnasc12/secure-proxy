
declare namespace WorldLineRequests {

    export interface AddCard {
        cardExpiryDate: string, //"201405",
        cardNumber: string, //"5219000000000000",
        interfaceVersion: string, //" WR_WS_2.3",
        keyVersion: string, //"1",
        merchantId: string, //"011223344550000",
        merchantWalletId: string, //"iDWal1",
        paymentMeanAlias: string, //"myvisacard",
        paymentMeanbrand: string, //"VISA",
        seal: string, //"4b7beed20ff443b3c05cc904bcd793ba6cace54b9ff669cf26d8576e267dc03c"
    }

    export interface CustomerContract {
      email: string
    } 

    export interface CardCheckEnrollment {
    amount: string, //"1000"
    captureDay: string, 
    captureMode: string, 
    cardCSCValue: string,
    cardExpiryDate: string,//"201602",
    cardNumber: string, //"1234123412341234",
    currencyCode: string, 
    customerContact : CustomerContract,
    interfaceVersion: string, //"IR_WS_2.9",
    intermediateServiceProviderId: string, // STORE_CODE
    keyVersion: string, //"1",
    merchantId: string, //"011223344550000",
    merchantReturnUrl: string,
    //merchantTransactionDateTime: string, //"2015-05-28T11:23:14.211+02:00",
    orderChannel: string,//"INTERNET",
    orderId: string,//"1234",
    returnContext: string, // "ReturnContext"
    transactionOrigin : string, // "INTERNET"
    transactionReference: string,//"TREFEXA2015",
    seal: string,//"607083393a51b4b23261270df83c28a61e06f74928bc1e868c0abb9325dde2f2"
    }

    export interface CardCheckEnrollmentWithPaymentToken {
      amount: string, //"1000"
      captureDay: string,
      captureMode: string,
      currencyCode: string,
      customerContact : CustomerContract,
      customerIpAddress: string,
      interfaceVersion: string, //"IR_WS_2.9",
      intermediateServiceProviderId: string, // STORE_CODE
      keyVersion: string, //"1",
      merchantId: string, //"011223344550000",
      merchantReturnUrl: string,
      orderChannel: string,//"INTERNET",
      orderId: string,//"1234",
      paymentToken: string,
      returnContext: string, // "ReturnContext"
      transactionOrigin : string, // "INTERNET"
      transactionReference: string,//"TREFEXA2015",
      seal: string,//"607083393a51b4b23261270df83c28a61e06f74928bc1e868c0abb9325dde2f2"
    }

    export interface CardValidateAuthentication {
      interfaceVersion: string, //"CR_WS_2.3",
      intermediateServiceProviderId,
      keyVersion: string, //"1",
      merchantId: string, //"011223344550000",
      messageVersion: string, //"0.1",
      paResMessage: string, //"eJydVVuTqjgQ....7h%2FwH0CKem",
      redirectionData: string, //"uqjeV+KegCSM0POI...",
      transactionReference: string, //"TREFEXA2015",
      seal: string, //"bed2f99d4137d402fde0c86a182f7d4f01c68e57d8a073fe5e920c57d06da1b5"
    }

    export interface  CardValidateAuthenticationAndOrder {
      interfaceVersion: string, 
      intermediateServiceProviderId,
      keyVersion: string, 
      merchantId: string, 
      messageVersion: string,
      paResMessage: string,
      redirectionData: string,
      transactionReference: string
      seal: string,
      }

      export interface  Validate {
        currencyCode: string,
        interfaceVersion: string, 
        intermediateServiceProviderId,
        keyVersion: string, 
        merchantId: string, 
        operationAmount: string,
        operationOrigin: string,
        s10TransactionReference: s10TransactionReference,
        transactionReference: string
        seal: string,
      }

      export interface CardOrder {
        amount: string, 
        captureDay: string, 
        captureMode: string, 
        cardCSCValue: string,
        cardExpiryDate: string,
        cardNumber: string,
        currencyCode: string,
        customerContact : CustomerContract,
        interfaceVersion: string, //"IR_WS_2.9",
        intermediateServiceProviderId: string, 
        keyVersion: string, 
        merchantId: string, 
        orderChannel: string,
        orderId: string,
        returnContext: string, 
        transactionOrigin : string, 
        transactionReference: string,
        seal: string,
        }

        export interface CardOrderWithPaymentToken {
          amount: string,
          captureDay: string,
          captureMode: string, 
          currencyCode: string, 
          customerContact : CustomerContract,
          customerIpAddress : string, 
          interfaceVersion: string, 
          intermediateServiceProviderId: string, // STORE_CODE
          keyVersion: string, 
          merchantId: string, 
          orderChannel: string,
          orderId: string,
          paymentToken: string,
          returnContext: string, 
          transactionOrigin : string, 
          transactionReference: string,
          seal: string,
          }

    export interface Refund {
        currencyCode: string,
        interfaceVersion: string, 
        intermediateServiceProviderId: string, 
        keyVersion: string, 
        merchantId: string, 
        operationAmount: string, 
        operationOrigin: string, 
        transactionReference: string,
        seal: string,
      }

      export interface Cancel {
        currencyCode: string,
        interfaceVersion: string,
        intermediateServiceProviderId: string, 
        keyVersion: string,
        merchantId: string, 
        operationAmount: string,
        operationOrigin: string, 
        transactionReference: string, 
        seal: string, 
      }


      export interface HostedFieldsInitialize {
        customerIpAddress: string,
        interfaceVersion: string, //"A U T _ W S _ 2 . 4 4",
        intermediateServiceProviderId: string, // STORE_CODE
        keyVersion: string, //"1"
        merchantId: string, //"011223344550000",
        paymentMeanBrandList: string[] | undefined, //["VISA", "CB"],
        seal: string, //"bed2f99d4137d402fde0c86a182f7d4f01c68e57d8a073fe5e920c57d06da1b5"
      }
  }

declare namespace WorldLineResponses {
  
    export interface AddCard {
      walletActionDateTime: string, //"2014-03-19T23:15:03-12:00",
      paymentMeanId: string, //"13",
      maskedPan: string, //"4977##########55",
      walletResponseCode: string, //"00",
      seal: string, //"a6671feade95c57085939fe973e8455a5c7a81d465f78f1b94c22f8b29a2b751"
    }
    
    export interface Cancel {
      newAmount: number,
      operationDateTime: string, 
      responseCode: string, 
      newStatus: string, 
      seal: string, 
    }
  
    export interface CardCheckEnrollment {
      errorFieldName : string | undefined
      redirectionUrl: string, //"http://www.acssiteweb.com",
      paReqMessage: string,//"eJxVUU1zgj...Rv8P/AJQjttc\u003d",
      redirectionData: string,//"uqjeV+Keg...MAwXk2jDJAe2TI\u003d",
      redirectionStatusCode: string,//"00",
      responseCode: string, 
      responseCodeDetail: string, 
      messageVersion: string,//"0.1",
      seal: string,//"3c40cf8c12a8eebdfc114c83db8f944b77932b03814d8bf43ea792c20d05e7a6"
      
    }

    export interface CardValidateAuthentication {
      responseCode: string, //"00",
      holderAuthentResponseCode: string, //"00",
      seal: string, //"bed2f99d4137d402fde0c86a182f7d4f01c68e57d8a073fe5e920c57d06da1b5"
    }

    export interface s10TransactionReference {
      s10TransactionId : string,
      s10TransactionIdDate : string
    }

    export interface  CardValidateAuthenticationAndOrder  {
      acquirerResponseCode: string,
      amount: string,
      authorisationId: string,
      captureDay: string,
      captureMode: string,
      cardExpiryDate: string,
      complementaryCode: string,
      complementaryInfo: string,
      currencyCode: string,
      customerIpAddress: string,
      holderAuthentMethod: string,
      holderAuthentStatus: string,
      holderAuthentProgram: string,
      guaranteeIndicator: string,
      maskedPan: string,
      merchantId: string,
      orderChannel: string,
      orderId: string,
      paymentMeanBrand: string,
      responseCode: string,
      returnContext: string,
      holderAuthentResponseCode: string,
      transactionDateTime: string,
      transactionReference: string,
      scoreProfile: string,
      s10TransactionReference: s10TransactionReference,
      seal: string
      paymentMeanBrandSelectionStatus: string,
      preAuthorisationProfile: string,
      preAuthorisationProfileValue: string,
      acquirerNativeResponseCode: string,
      transactionPlatform:string,
      holderAuthentRelegationCode: string,
      authorMessageReference: string,
      authorisationTypeLabel: string,
      acceptanceSystemApplicationId: string, 
      holderAuthentType: string,
      schemeTransactionIdentifier: string,
      captureLimitDate: string,
      captureLimitDateTime: string
    }


    
    export interface  Validate {
      acquirerResponseCode: string, //"00",
      authorisationId: string, 
      newAmount: number,
      operationDateTime: string,
      responseCode: string,
      newStatus: string,
      seal: string,
    }

    export interface CardOrder {
      acquirerResponseCode: string, //"00",
      authorisationId: string, //"123456789102",
      cardScheme: string,
      complementaryCode: string
      complementaryInfo: string,
      errorFieldName: string,
      maskedPan: string, 
      responseCode: string, 
      responseCodeDetail: string, 
      returnContext: string,
      transactionDateTime: string,
      transactionPlatform : string,
      seal: string,
    }
  
    export interface Refund {
      acquirerResponseCode: string, //"00",
      authorisationId: string, //"123456789102",
      newAmount: string,
      operationDateTime: string, //"2012-10-16T23:45:34-12:00",
      responseCode: string, //"00",
      newStatus: string, //"TO_CREDIT",
      seal: string, //"919b544bfb60539c8979992bc469e0b4229030ee2462a51f62c9cbd3510b3647"
    }

    export interface HostedFieldsInitialize {
      merchantSessionToken: string, //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJkY[...]PTiJ9.lpENU[...]O61_g"
      responseCode: string, //"00",
      sdkUrl: string, //"https://payment-web.test.sips-services.com/paymentprovider/hostedfields/services/sdpx-hostedfields-sdk.js"
      seal: string, //"bed2f99d4137d402fde0c86a182f7d4f01c68e57d8a073fe5e920c57d06da1b5"
    }
}
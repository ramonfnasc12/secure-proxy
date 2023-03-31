export const constants = {
    URL_TEST: 'https://office-server.test.sips-services.com',
    URL_PRODUCTION: 'https://office-server.sips-services.com',
    DELAY_TO_CANCEL: 900, // 15 minutes
    DELAY_TO_AUTOSETTLE: 475200, // 5.5 days
    CARD_CHECK_ENROLLMENT_PATH : '/rs-services/v2/checkout/cardCheckEnrollment',
    CARD_VALIDATE_AUTHENTICATION : '/rs-services/v2/checkout/cardValidateAuthentication',
    CARD_VALIDATE_AUTHENTICATION_AND_ORDER : '/rs-services/v2/checkout/cardValidateAuthenticationAndOrder',
    VALIDATE : '/rs-services/v2/cashManagement/validate',
    WALLET_CHECK_ENROLLMENT_PATH : '/rs-services/v2/checkout/walletCheckEnrollment',
    ACCEPT_CHALLENGE_PATH : '/rs-services/v2/cashManagement/acceptChallenge',
    CANCEL_PATH : '/rs-services/v2/cashManagement/cancel',
    CARD_ORDER_PATH : '/rs-services/v2/checkout/cardOrder',
    GET_TRANSACTION_DATA_PATH : '/rs-services/v2/diagnostic/getTransactionData',  
    PAN_TO_TOKEN_PATH : '/rs-services/v2/token/panToToken',
    REFUND_PATH : '/rs-services/v2/cashManagement/refund',
    HOSTED_FIELDS_INITIALIZE : '/rs-services/v2/authentication/hostedFieldsInitialize',
    HOSTED_FIELDS_INTERFACE_VERSION: 'AUT_WS_2.44',
    CARD_ORDER_INTERFACE_VERSION: 'IR_WS_2.3',
    CARD_VALIDATION_INTERFACE_VERSION: 'IR_WS_2.35',
    VALIDATE_INTERFACE_VERSION : 'CR_WS_2.3',
    CARD_VALIDATION_MESSAGE_VERSION : '0.1',
    CARD_VALIDATION_AND_ORDER_INTERFACE_VERSION: 'IR_WS_2.9',
    CARD_VALIDATION_AND_ORDER_MESSAGE_VERSION: '1',
    APPLICATION_NAME : 'casinofr.ppp-worldline',
    MASTERDATA_ENTITY : 'PI',
    CAPTURE_MODE : 'VALIDATION',
    AUTHOR_CAPTURE_MODE : 'AUTHOR_CAPTURE',
    CURRENCY_CODE : '978',
    OPERATION_ORIGIN : 'SO_BATCH',
    CAPTURE_DAY : '6',
    MERCHANT_ID_MD_ENTITY: 'MI'
  } as const

  export interface MerchantIdResponse {
    merchantID: string,
    storeID: string
  };
  
  export enum WorkflowTypes {
    PAYMENT = 'payments',
    HOOK = 'hook',
    PING = 'ping',
    SETTLE = 'settle',
    REFUND = 'refund',
    CANCEL = 'cancel',
  }

  export enum VtexPaymentStatus {
    UNDEFINED = 'undefined',
    APPROVED = 'approved',
    DENIED = 'denied',
  }
  
  export enum VtexPaymentAuthorizationStatus {
    UNDEFINED = 'undefined',
    APPROVED = 'approved',
    DENIED = 'denied',
  }
  
  export enum SuccessMessages {
    CREATE = 'Transaction created',
    REFUND = 'Successful refund',
    CANCEL = 'Successful cancellation',
    SETTLE = 'Successful settle',
  }
    
  export const PaymentType = {
    CreditCard: 'CreditCard',
  }  

  export const ErrorCodes: Map<string, string> = new Map([
    ['00', 'Accepted transaction/operation'],
    ['01', 'For panToToken and tokenToPan methods, partial success'],
    ['02', 'Request of authorized on via telephone with the issuer because of exceeding the card authorization threshold'],
    ['03', 'Invalid merchant contract'],
    ['04', 'Unknown error'],
    ['05', 'Refused authorization'],
    ['11', 'Used for differed check. The PAN is blocked'],
    ['12', 'Invalid transaction. Please check the request parameters'],
    ['14', 'Invalid PAN or payment mean data check is failed (e.g. card number or the visual cryptogram of the card or AVS address)'],
    ['17', 'Customer cancellation'],
    ['24', 'operation rejected, request already carried out with the same data and the same parameters'],
    ['25', 'Transaction unknown by WL Sips'],
    ['30', 'Format error'],
    ['34', 'Fraud suspicion (seal erroneous)'],
    ['40', 'Function not supported: the operation that you wish to perform is not part of the operation type for which you are authorized'],
    ['51', 'Amount too high'],
    ['54', 'Payment mean expiry date is past'],
    ['55', 'Merchant does not accept prepaid cards'],
    ['57', 'Refund operation refused because the original transaction was subject of an unpaid'],
    ['60', 'Transaction pending'],
    ['62', 'Waiting the confirmation for the transaction (used by PayPal 1.0)'],
    ['63', 'Security rules not observed, transaction stopped'],
    ['75', 'Number of attempts to enter the data of the payment mean from Sips Paypage is exceeded'],
    ['90', 'Service temporarily not available'],
    ['94', 'Duplicated transaction: the transactionReference has been used previously'],
    ['97', 'Session expired (no action from the user during 15 minutes), transaction refused'],
    ['99', 'Temporarily problem with the payment server'],
    // CUSTOM
    ['-1', 'Unknown Error on Card Order. Contact Support'],
  ])
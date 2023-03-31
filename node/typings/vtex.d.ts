export interface VtexRequestProxyHeaders {
    'X-PROVIDER-Forward-To': string
    'X-PROVIDER-Forward-paymentToken'?: string
    'X-VTEX-API-AppKey'?: string
    'X-VTEX-API-AppToken'?: string
  }

  export interface SecureProxyTokensResponse{
    tokens: SecureProxyTokens[]
  }
  
  interface SecureProxyTokens{
    name: string
    placeholder: string
  }
  
  interface CardAddress {
    country: string
    state: string
    city: string
    line1: string
    line2: string
    zip_code: string
    title: string
    first_name: string
    last_name: string
    phone: string
    email: string
  }
  
  export interface VtexRequestHeaders {
    appKey: string
    appToken: string
    sessionId: string
    userAgent: string
    clientIP: string
    accept: string
  }
  
  interface PaymentOrder {
    id: string
    paymentSystem: number
    paymentSystemName: string
    merchantName?: any
    group: string
    isCustom: boolean
    allowInstallments: boolean
    requiresAuthentication: boolean
    allowIssuer: boolean
    allowNotification: boolean
    isAvailable: boolean
    description?: any
    authorizationDate: Date
    self: Self
    tid: string
    nsu?: any
    returnCode?: any
    returnMessage?: any
    status: string
    connector: string
    ConnectorResponses: ConnectorResponses
    connectorResponse: ConnectorResponse
    ShowConnectorResponses: boolean
    value: number
    installmentsInterestRate: number
    installmentsValue: number
    referenceValue: number
    installments: number
    currencyCode: string
    provider?: any
    isBillingAddressDifferent?: any
    fields: Field[]
    sheets?: any
    originalPaymentId?: any
  }
  
  export interface Interactions {
    href: string
  }
  
  export interface Settlements {
    href: string
  }
  
  export interface Payments {
    href: string
  }
  
  export interface Refunds {
    href: string
  }
  
  export interface Cancellations {
    href: string
  }
  
  export interface Field {
    name: string
    value: string
  }
  
  export interface TransactionDetail {
    id: string
    transactionId: string
    referenceKey: string
    interactions: Interactions
    settlements: Settlements
    payments: Payments
    refunds: Refunds
    cancellations: Cancellations
    timeoutStatus: number
    totalRefunds: number
    status: string
    value: number
    receiverUri?: any
    startDate: Date
    authorizationToken: string
    authorizationDate: Date
    commitmentToken?: any
    commitmentDate?: any
    refundingToken?: any
    refundingDate?: any
    cancelationToken?: any
    cancelationDate?: any
    fields: Field[]
    shopperInteraction: string
    ipAddress: string
    sessionId: string
    macId: string
    vtexFingerprint?: any
    chargeback?: any
    whiteSignature?: any
    owner: string
    orderId: string
    userAgent: string
    acceptHeader: string
    antifraudTid?: any
    antifraudResponse?: any
    antifraudReference?: any
    antifraudAffiliationId?: any
    channel: string
    salesChannel: string
    urn?: any
    softDescriptor?: any
    markedForRecurrence: boolean
    buyer?: any
  }
  
  interface Internal3DS2Attributes {
    browser_header: string
    browser_java_enabled: boolean
    browser_language: string
    browser_color_depth: string // Enum: "1" "4" "8" "15" "16" "24" "32" "48"
    browser_screen_height: string //
    browser_screen_width: string
    browser_time_zone: string
  }
  
  interface External3DS2Attributes {
    eci_flag: string
    three_d_secure_version: string
  }
  
  export interface TaxCart {
    items: Array<{
      id: string
      taxRate: number
    }>
  }
  
  export interface TransactionCart {
    items: Array<{
      id: string
      value: number
      quantity: number
      priceTags?: Array<{
        name: string
        value: number
        isPercentual: boolean
      }>
      discount: string
      productId: string
    }>
    tax: number
  }
  
  export interface TransactionDeviceInfo {
    screenWidth: string
    screenHeight: string
    colorDepth: string
    timeZoneOffset: string
    language: string
    javaEnabled: boolean
    acceptHeader: string
    userAgent: string
    ipAddress: string
  }
  
  export interface CustomField {
    name: string
    value: string
  }
  
import type {
    VtexRequestHeaders,
    VtexRequestProxyHeaders,
  } from '../typings/vtex'
  
  export const extractHeaders = (headers: any): VtexRequestHeaders => {
    const clientIP = headers['x-forwarded-for']
      ? headers['x-forwarded-for'].split(',')[0]
      : ''
  
    return {
      appKey: headers['x-vtex-api-appkey'] ?? headers['x-provider-api-appkey'],
      appToken:
        headers['x-vtex-api-apptoken'] ?? headers['x-provider-api-apptoken'],
      sessionId: headers['x-request-id'],
      clientIP,
      userAgent: headers['user-agent'],
      accept: headers.accept,
    }
  }
  
  export const vtexHeaders = (
    url: string,
    paymentToken: string
  ): VtexRequestProxyHeaders => {
    return {
      'X-PROVIDER-Forward-To': url,
      'X-PROVIDER-Forward-paymentToken': paymentToken,
    }
  }
  
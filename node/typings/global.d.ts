declare global {
  type LoggerMessage = {
    workflowType: WorkflowTypes
    workflowInstance: string
    message: string
    exception?: string
    request?: any
  }
}

export {}

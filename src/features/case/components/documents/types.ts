export type CaseDocumentResponse = {
      id: number,
      inspectionId: number,
      displayName: string,
      originalName: string,
      mimeType: string,
      url: string,
      fileType: 'INSPECTION_REPORT' | 'FLOOR_PLAN',
      objectKey: string
}

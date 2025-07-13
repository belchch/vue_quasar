export type CaseDocumentResponse = {
      id: number,
      inspectionId: number,
      displayName: string,
      originalName: string,
      mimeType: string,
      url: string,
      fileType: CaseDocumentType,
      objectKey: string
}

export type CaseDocumentType = 'INSPECTION_REPORT' | 'FLOOR_PLAN';

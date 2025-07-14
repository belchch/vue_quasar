import { api } from "src/boot/axios"

export const LookupApi = {
    uploadLookup(objectKey: string) {
        return api.post(`/api/lookup/upload`, {}, {
            params: {
                objectKey
            }
        })
    }
}
import type { AxiosError } from 'axios'

type ApiErrorBody = {
  message?: unknown
  error?: unknown
  detail?: unknown
}

const asString = (value: unknown): string | null => {
  if (typeof value === 'string' && value.trim()) return value.trim()
  if (Array.isArray(value) && value.length) return asString(value[0])
  return null
}

/**
 * Извлекает человекочитаемое сообщение из ошибки axios.
 * Бэкенд может возвращать { message }, { error }, { detail } или массив.
 * Если ничего полезного нет — возвращает fallback.
 */
export const extractApiErrorMessage = (error: unknown, fallback: string): string => {
  const axiosError = error as AxiosError<ApiErrorBody> | undefined

  const body = axiosError?.response?.data
  if (body) {
    return asString(body.message) ?? asString(body.error) ?? asString(body.detail) ?? fallback
  }

  if (axiosError?.message) return axiosError.message

  if (error instanceof Error && error.message) return error.message

  return fallback
}

/** HTTP-статус ошибки или null. */
export const getApiErrorStatus = (error: unknown): number | null => {
  const axiosError = error as AxiosError | undefined
  return axiosError?.response?.status ?? null
}

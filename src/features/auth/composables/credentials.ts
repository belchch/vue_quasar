import type {Tokens} from "src/features/auth/stores/types";

const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_TOKEN_KEY = "refreshToken"

export const Credentials = {
    setTokens(tokens: Tokens) {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
    },

    removeTokens() {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    },

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    isAuthenticated() {
        return this.getAccessToken() != null
    }
}

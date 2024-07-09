const BASE_URL_API_ENDPOINT = process.env.REACT_APP_API_BASE_API_ENDPOINT;

const STATUS_MAP = {
    OK: 200,
    NOT_FOUND: 404,
    FORBIDDEN: 403
}

const maxLengthForTruncatedText = 7;

export {
    BASE_URL_API_ENDPOINT,
    STATUS_MAP,
    maxLengthForTruncatedText
}
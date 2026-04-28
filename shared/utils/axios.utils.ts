import axios from 'axios';

type CachedResponse = {
    expiresAt: number;
    data: unknown;
};

declare module 'axios' {
    interface AxiosRequestConfig {
        cache?: boolean;
        cacheTtlMs?: number;
    }
}

const DEFAULT_CACHE_TTL_MS = 60_000;
const responseCache = new Map<string, CachedResponse>();

const getCacheKey = (url?: string, params?: unknown) => {
    const serializedParams = params ? JSON.stringify(params) : '';
    return `${url ?? ''}::${serializedParams}`;
};

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WASEL_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: (status: number) => {
        return status >= 200 && status < 300;
    },
    timeout: 30000,
    transformResponse: (data) => {
        if (!data) {
            return { content: null, schemas: null };
        }

        let parsedData: unknown = data;
        if (typeof data === 'string') {
            try {
                parsedData = JSON.parse(data);
            } catch {
                return data;
            }
        }

        if (Array.isArray(parsedData)) {
            return {
                content: parsedData[0] ?? null,
                schemas: parsedData[1] ?? null,
            };
        }

        if (parsedData && typeof parsedData === 'object') {
            const record = parsedData as Record<string, unknown>;
            const payload =
                record.data && typeof record.data === 'object'
                    ? (record.data as Record<string, unknown>)
                    : record;

            return {
                ...payload,
                content: payload.content ?? payload.home ?? null,
                common: payload.common ?? null,
                schemas: payload.schemas ?? null,
                alt_img: payload.alt_img ?? null,
            };
        }

        return parsedData;
    },
});

axiosInstance.interceptors.request.use((config) => {
    const shouldUseCache = config.cache === true && config.method?.toLowerCase() === 'get';
    if (!shouldUseCache) {
        return config;
    }

    const key = getCacheKey(config.url, config.params);
    const cached = responseCache.get(key);
    if (!cached) {
        return config;
    }

    if (Date.now() > cached.expiresAt) {
        responseCache.delete(key);
        return config;
    }

    config.adapter = async () => ({
        data: cached.data,
        status: 200,
        statusText: 'OK',
        headers: config.headers ?? {},
        config,
        request: undefined,
    });

    return config;
});

axiosInstance.interceptors.response.use((response) => {
    const shouldUseCache = response.config.cache === true && response.config.method?.toLowerCase() === 'get';
    if (!shouldUseCache) {
        return response;
    }

    const key = getCacheKey(response.config.url, response.config.params);
    const ttl = response.config.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS;
    responseCache.set(key, {
        data: response.data,
        expiresAt: Date.now() + ttl,
    });

    return response;
});

export default axiosInstance;
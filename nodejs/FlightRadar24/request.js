const {CloudflareError} = require("./errors");

let fetch = globalThis.fetch;

if (!fetch) {
    try {
        fetch = require("node-fetch");
    }
    catch (error) {
        // Fallback if fetch is missing
    }
}


/**
 * Class to make requests to the FlightRadar24.
 */
class APIRequest {
    /**
     * Constructor of the APIRequest class.
     *
     * @param {string} [url]
     * @param {object} [params]
     * @param {object} [headers]
     * @param {object} [data]
     * @param {object} [cookies]
     * @param {object} [excludeStatusCodes=[]]
     * @param {string} [proxyUrl]
     */
    constructor(url, params = null, headers = null, data = null, cookies = null, excludeStatusCodes = [], proxyUrl = null) {
        this.proxyUrl = proxyUrl;
        this.requestParams = {
            "params": params,
            "headers": headers,
            "data": data,
            "cookies": cookies,
        };

        this.requestMethod = data == null ? "GET" : "POST";
        this.__excludeStatusCodes = excludeStatusCodes;

        if (params != null && Object.keys(params).length > 0) {
            url += "?";

            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) { // guard-for-in
                    url += key + "=" + params[key] + "&";
                }
            }
            url = url.slice(0, -1);
        }

        this.url = url;

        this.__response = {};
        this.__content = null;
    }

    /**
     * Send the request and receive a response.
     *
     * @return {this}
     */
    /**
     * MODIFIED VERSION: This library has been patched to support Cloudflare bypass via Worker Proxy.
     */
    async receive() {
        this.__proxyUrl = (this.proxyUrl || process.env.FR24_PROXY_URL || "").trim();
        const targetUrl = this.__proxyUrl ? this.__proxyUrl + encodeURIComponent(this.url) : this.url;

        // Pass the Accept header to the worker
        const headers = {
            "Accept": this.requestParams["headers"]?.["accept"] || "*/*",
        };

        this.__response = await fetch(targetUrl, {method: "GET", headers});

        if (this.getStatusCode() == 520) {
            throw new CloudflareError(
                "An unexpected error has occurred. Perhaps you are making too many calls?",
                this.__response,
            );
        }

        if (!this.__excludeStatusCodes.includes(this.getStatusCode())) {
            if (![200, 201, 202].includes(this.getStatusCode())) {
                throw new Error(
                    "Received status code '" +
                    this.getStatusCode() + ": " +
                    this.__response.statusText + "' for the URL " +
                    this.url,
                );
            }
        }
        return this;
    }

    /**
     * Return the received content from the request.
     */
    async getContent() {
        if (this.__content !== null) {
            return this.__content;
        }

        let contentType = this.getHeaders()["content-type"];
        contentType = contentType == null ? "" : contentType;

        if (contentType.includes("application/json")) {
            this.__content = await this.__response.json();
        }
        else if (contentType.includes("text")) {
            this.__content = await this.__response.text();
        }
        else {
            // Conversion en Buffer pour la compatibilité avec la bibliothèque
            const arrayBuffer = await this.__response.arrayBuffer();
            this.__content = Buffer.from(arrayBuffer);
        }
        return this.__content;
    }

    /**
     * Return the received cookies from the request.
     *
     * @return {object}
     */
    getCookies() {
        // Le fetch natif n'a pas .raw(), on utilise getSetCookie()
        const rawCookies = this.__response.headers.getSetCookie ? this.__response.headers.getSetCookie() : [];
        const cookies = {};

        rawCookies.forEach((string) => {
            const keyAndValue = string.split(";")[0].split("=");
            cookies[keyAndValue[0]] = keyAndValue[1];
        });

        return cookies;
    }

    /**
     * Return the headers of the response.
     *
     * @return {object}
     */
    getHeaders() {
        const headersAsDict = {};

        this.__response.headers.forEach((value, key) => {
            headersAsDict[key] = value;
        });
        return headersAsDict;
    }

    /**
     * Return the received response object.
     *
     * @return {object}
     */
    getResponseObject() {
        return this.__response;
    }

    /**
     * Return the status code of the response.
     *
     * @return {number}
     */
    getStatusCode() {
        return this.__response.status;
    }
}

module.exports = APIRequest;

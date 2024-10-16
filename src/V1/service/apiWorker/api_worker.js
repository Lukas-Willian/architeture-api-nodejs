const fetch = require("node-fetch");

async function apiWorker({
  url,
  method = "GET",
  body = null,
  extraHeaders = {},
  timeout = 10000,
  withCredentials = true,
  onSuccess,
  onError,
}) {
  try {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (withCredentials) {
      const token = "bWFyY2Vsb21vbnRlaXJvOkBtYXJjZWxvbW9udGVpcm8=";

      if (token) {
        headers = {
          ...headers,
          Authorization: `Basic ${token}`,
        };
      }
    }

    if (extraHeaders) {
      headers = {
        ...headers,
        ...extraHeaders,
      };
    }

    let newUrl = "https://sistema.publisend.com.br/api/v2" + url;

    let content = null;

    if (method !== "GET" && body) {
      content = JSON.stringify(body);
    }

    const abortController = new AbortController();

    const _timeout = setTimeout(() => abortController.abort(), timeout);

    const response = await fetch(newUrl, {
      method,
      headers,
      body: content,
      signal: abortController.signal,
    });

    const data = await response.json();

    clearTimeout(_timeout);

    if (response.status && response.status !== 200) {
      return onError?.(data);
    }

    return onSuccess?.(data);
  } catch (exc) {
    console.log(exc);
    onError?.(exc);
  }
}

module.exports = apiWorker;

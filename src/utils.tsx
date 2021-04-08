
export async function jsonRequest(method: "POST" | "GET", url: string, bearerToken: string = "", body?: { [key: string]: any }) {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    var args: RequestInit = {
        method,
        headers: requestHeaders
    }
    if (bearerToken && args.headers) {
        args.credentials = 'include';
        requestHeaders.set('Authorization', 'Bearer ' + bearerToken)
    }
    if (body) {
        args.body = JSON.stringify(body);
    }
    return fetch(url, args).then(data => data.json())
}

  
import { APP_ENV } from "../env";

const TEN_HOURS = 10 * 60 * 60 * 1000;

export const login = async (username: string, password: string) => {
    const response = await fetch(`${APP_ENV.BASE_URL}/login`, {
        method: "POST",
        cache: "no-cache",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    const ascData = { ...data, timestamp: Date.now() };
    localStorage.setItem("asc", JSON.stringify(ascData));
    return ascData;
};
export const updatePhpSession = async (token: string, sessionId: string) => {
    const response = await fetch(`${APP_ENV.BASE_URL}/update`, {
        method: "POST",
        cache: "no-cache",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ token, sessionId })
    });

    const phpSessionId  = await response.json();
    const asc = JSON.parse(localStorage.getItem("asc") || "{}");
    const updatedAsc = { ...asc, phpSessionId, timestamp: Date.now() };
    localStorage.setItem("asc", JSON.stringify(updatedAsc));
    return updatedAsc;
};

export const makeParsingRequest = async (url: string) => {
    const asc = JSON.parse(localStorage.getItem("asc") || "{}");

    if (asc && asc.timestamp) {
        if (Date.now() - asc.timestamp < TEN_HOURS) {
            return await fetch(`${APP_ENV.BASE_URL}/parse`, {
                method: "POST",
                cache: "no-cache",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ token: asc.token, sessionId: asc.sessionId, phpSessionId: asc.phpSessionId, campusPageUrl: url })
            });
        } else {
            const refreshedData = await updatePhpSession(asc.token, asc.sessionId);
            return await fetch(`${APP_ENV.BASE_URL}/parse`, {
                method: "POST",
                cache: "no-cache",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ token: refreshedData.token, sessionId: refreshedData.sessionId, phpSessionId: refreshedData.phpSessionId, campusPageUrl: url })
            });
        }
    } else {
        throw new Error("ASC data not found or timestamp missing");
    }
};

export const logout = async () => await localStorage.clear();

export const getToken = (): string => {
	const data = localStorage.getItem("token");
	return data ? JSON.parse(data) : '';
}

export const setToken = (key: string, token: string): void => {
	localStorage.setItem(key, JSON.stringify(token));
}

export const removeToken = (key: string): void => {
	localStorage.removeItem(key);
}

// APIのベースURL（開発環境用）
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * APIからデータを取得するための基本関数
 */
export async function fetchFromAPI<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`;

	const response = await fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status}`);
	}

	return response.json() as Promise<T>;
}

/**
 * 挨拶メッセージを取得する関数
 */
export async function fetchHello() {
	return fetchFromAPI<{ message: string; timestamp: string; status: string }>(
		"/api/hello/",
	);
}

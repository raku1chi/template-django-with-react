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

/**
 * Todoの型定義
 */
export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	created_at: string;
	updated_at: string;
}

/**
 * 新しいTodoを作成するためのデータ型
 */
export interface CreateTodoInput {
	title: string;
	completed?: boolean;
}

/**
 * Todoを更新するためのデータ型
 */
export interface UpdateTodoInput {
	title?: string;
	completed?: boolean;
}

/**
 * すべてのTodoを取得する関数
 */
export async function fetchTodos() {
	return fetchFromAPI<Todo[]>("/api/todos/");
}

/**
 * 特定のTodoを取得する関数
 */
export async function fetchTodo(id: number) {
	return fetchFromAPI<Todo>(`/api/todos/${id}/`);
}

/**
 * 新しいTodoを作成する関数
 */
export async function createTodo(todoData: CreateTodoInput) {
	return fetchFromAPI<Todo>("/api/todos/", {
		method: "POST",
		body: JSON.stringify(todoData),
	});
}

/**
 * Todoを更新する関数
 */
export async function updateTodo(id: number, todoData: UpdateTodoInput) {
	return fetchFromAPI<Todo>(`/api/todos/${id}/`, {
		method: "PATCH",
		body: JSON.stringify(todoData),
	});
}

/**
 * Todoを削除する関数
 */
export async function deleteTodo(id: number) {
	return fetchFromAPI<void>(`/api/todos/${id}/`, {
		method: "DELETE",
	});
}

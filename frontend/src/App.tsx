import { TodoForm } from "@/components/TodoForm";
import { TodoItem } from "@/components/TodoItem";
import type { Todo } from "@/lib/api";
import { fetchTodos } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/ui/card";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const loadTodos = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchTodos();
			setTodos(data);
		} catch (err) {
			console.error("Todoの読み込みに失敗しました:", err);
			setError("Todoの読み込みに失敗しました");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadTodos();
	}, [loadTodos]);

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-4">Todoアプリ</h1>
				<p className="text-gray-500 mb-4">
					シンプルなTodoアプリでタスク管理をしましょう
				</p>
			</header>

			<main>
				<Card className="p-6 bg-gray-50">
					<TodoForm onTodoAdded={loadTodos} />

					{loading ? (
						<div className="text-center py-8">
							<p className="text-gray-500">読み込み中...</p>
						</div>
					) : error ? (
						<div className="text-center py-8 text-red-500">
							<p>{error}</p>
						</div>
					) : todos.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-gray-500">
								タスクがありません。新しいタスクを追加してください。
							</p>
						</div>
					) : (
						<div>
							<h2 className="text-lg font-medium mb-3">タスク一覧</h2>
							{todos.map((todo) => (
								<TodoItem key={todo.id} todo={todo} onTodoUpdate={loadTodos} />
							))}
						</div>
					)}
				</Card>
			</main>
		</div>
	);
}

export default App;

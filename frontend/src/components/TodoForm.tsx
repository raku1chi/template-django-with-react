import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTodo } from "@/lib/api";
import { useState } from "react";

interface TodoFormProps {
	onTodoAdded: () => void;
}

export function TodoForm({ onTodoAdded }: TodoFormProps) {
	const [title, setTitle] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (title.trim() === "") return;

		try {
			setIsLoading(true);
			await createTodo({ title });
			setTitle("");
			onTodoAdded();
		} catch (error) {
			console.error("Todo作成エラー:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2 mb-6">
			<Input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="新しいタスクを入力..."
				disabled={isLoading}
				className="flex-1"
			/>
			<Button type="submit" disabled={isLoading || title.trim() === ""}>
				追加
			</Button>
		</form>
	);
}

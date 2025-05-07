import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/lib/api";
import { deleteTodo, updateTodo } from "@/lib/api";
import { useState } from "react";
import { Input } from "./ui/input";

interface TodoItemProps {
	todo: Todo;
	onTodoUpdate: () => void;
}

export function TodoItem({ todo, onTodoUpdate }: TodoItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(todo.title);
	const [isLoading, setIsLoading] = useState(false);

	const handleStatusChange = async () => {
		try {
			setIsLoading(true);
			await updateTodo(todo.id, { completed: !todo.completed });
			onTodoUpdate();
		} catch (error) {
			console.error("Todo更新エラー:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async () => {
		try {
			setIsLoading(true);
			await deleteTodo(todo.id);
			onTodoUpdate();
		} catch (error) {
			console.error("Todo削除エラー:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = async () => {
		if (title.trim() === "") return;

		try {
			setIsLoading(true);
			await updateTodo(todo.id, { title });
			setIsEditing(false);
			onTodoUpdate();
		} catch (error) {
			console.error("Todo更新エラー:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setTitle(todo.title);
	};

	return (
		<div className="flex items-center gap-2 p-3 border rounded-md mb-2 bg-white">
			<Checkbox
				checked={todo.completed}
				onCheckedChange={handleStatusChange}
				disabled={isLoading}
				className="mr-2"
			/>

			{isEditing ? (
				<div className="flex-1 flex items-center gap-2">
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="flex-1"
						disabled={isLoading}
					/>
					<Button
						size="sm"
						onClick={handleSave}
						disabled={isLoading || title.trim() === ""}
					>
						保存
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={handleCancel}
						disabled={isLoading}
					>
						キャンセル
					</Button>
				</div>
			) : (
				<>
					<span
						className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}
					>
						{todo.title}
					</span>
					<Button
						size="sm"
						variant="outline"
						onClick={handleEdit}
						disabled={isLoading}
					>
						編集
					</Button>
					<Button
						size="sm"
						variant="destructive"
						onClick={handleDelete}
						disabled={isLoading}
					>
						削除
					</Button>
				</>
			)}
		</div>
	);
}

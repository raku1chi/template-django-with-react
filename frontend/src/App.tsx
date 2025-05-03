import { Button } from "@/components/ui/button";
import { fetchHello } from "@/lib/api";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [message, setMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const loadHelloMessage = async () => {
		try {
			setLoading(true);
			const data = await fetchHello();
			setMessage(data.message);
		} catch (error) {
			console.error("APIリクエストに失敗しました:", error);
			setMessage("APIサーバーに接続できません");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadHelloMessage();
	}, []);

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<header className="mb-8 text-center">
				<h1 className="text-3xl font-bold mb-4">Example App</h1>
				{loading ? (
					<p className="text-gray-500">読み込み中...</p>
				) : (
					<div className="p-4 bg-gray-100 rounded-md">
						<p className="text-xl">{message || "サーバーに接続中..."}</p>
						<Button onClick={loadHelloMessage} className="mt-2">
							更新
						</Button>
					</div>
				)}
			</header>

			<main>
				<p>Example</p>
			</main>
		</div>
	);
}

export default App;

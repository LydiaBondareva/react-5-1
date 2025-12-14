import { useEffect, useState } from 'react';
import styles from './app.module.css';

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((data) => data.json())
			.then((newTodos) => setTodos(newTodos));
	}, []);

	return (
		<div className={styles.container}>
			<h1>Todos:</h1>
			<ul className={styles.list}>
				{todos.map((todo) => (
					<li key={todo.id} className={styles['list-item']}>
						{todo.title}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;

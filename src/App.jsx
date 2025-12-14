import { useEffect, useState, useRef } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import styles from './app.module.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [addedTodo, setAddedTodo] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [showInput, setShowInput] = useState('');
	const [newTaskValue, setNewTaskValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [sorted, setSorted] = useState(false);

	const changeInpRef = useRef(null);
	const filteredTodos = !sorted
		? todos.filter((task) => task.title.includes(searchValue))
		: todos
				.filter((task) => task.title.includes(searchValue))
				.sort((a, b) => {
					if (a.title > b.title) {
						return 1;
					} else if (a.title < b.title) {
						return -1;
					} else return 0;
				});

	useEffect(() => {
		fetch('http://localhost:3000/todos')
			.then((data) => data.json())
			.then((newTodos) => setTodos(newTodos));
	}, [refreshTodosFlag]);

	function refreshTodos() {
		setRefreshTodosFlag(!refreshTodosFlag);
	}

	function onChange(event) {
		setAddedTodo(event.target.value);
	}

	function postOnEnter(event) {
		if (event.key === 'Enter') {
			postTodo();
		}
	}

	function postTodo() {
		if (addedTodo === '') {
			return;
		}
		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: addedTodo,
			}),
		}).then(refreshTodos);
		setAddedTodo('');
	}

	function editTodo(id, title) {
		setShowInput(id);
		setNewTaskValue(title);
		setTimeout(() => {
			if (changeInpRef.current) {
				changeInpRef.current.focus();
			}
		}, 0);
	}

	function changeTodo(id) {
		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: newTaskValue,
			}),
		}).then(refreshTodos);
	}

	function onInpTaskChange(event) {
		setNewTaskValue(event.target.value);
	}

	function updateOnEnter(event, id) {
		if (event.key === 'Enter') {
			changeTodo(id);
			setShowInput('');
			setNewTaskValue('title');
		}
	}

	function deleteTodo(id) {
		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE',
		}).then(refreshTodos);
	}
	function serchValueChange(event) {
		setSearchValue(event.target.value);
	}

	function sortTasks() {
		setSorted(!sorted);
	}

	return (
		<div className={styles.container}>
			<h1>Todos:</h1>
			<div className={styles.addContainer}>
				<input
					className={styles.addTodo}
					placeholder="Введите новое дело..."
					value={addedTodo}
					onKeyDown={postOnEnter}
					onChange={onChange}
				/>
				<button onClick={postTodo} className={styles.addBtn}>
					Добавить в список
				</button>
			</div>
			<div className={styles.addContainer}>
				<input
					onChange={serchValueChange}
					className={styles.search}
					placeholder="Введите текст для поиска..."
				/>
			</div>
			<button className={styles.searchBtn} onClick={sortTasks}>
				{sorted ? 'Отменить сортировку' : 'Сортировать по алфавиту'}
			</button>
			<ul className={styles.list}>
				{filteredTodos.map((todo) => (
					<li key={todo.id} className={styles['list-item']}>
						{showInput !== todo.id && <span>{todo.title}</span>}
						{showInput === todo.id && (
							<input
								ref={changeInpRef}
								value={newTaskValue}
								onChange={onInpTaskChange}
								onKeyDown={(event) => updateOnEnter(event, todo.id)}
								type="text"
								className={styles.changeInp}
							/>
						)}
						<div className={styles.todoActions}>
							<button
								onClick={() => editTodo(todo.id, todo.title)}
								className={styles.editButton}
							>
								<FiEdit2 />
							</button>
							<button onClick={() => deleteTodo(todo.id)} className={styles.deleteButton}>
								<FiTrash2 />
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;

import { useEffect, useState, useRef } from 'react';

function App() {
	const [currentInput, setCurrentInput] = useState('');
	const textAreaRef = useRef();

	const resizeTextArea = () => {
		textAreaRef.current.style.height = 'auto';
		textAreaRef.current.style.height =
			textAreaRef.current.scrollHeight + 'px';
	};

	const formatStringToCamelCase = (str) => {
		const splitted = str.split('-');
		if (splitted.length === 1) return splitted[0];
		return (
			splitted[0] +
			splitted
				.slice(1)
				.map((word) => word[0].toUpperCase() + word.slice(1))
				.join('')
		);
	};
	const getStyleObjectFromString = (str) => {
		const style = {};
		try {
			let _str = str.replaceAll("'", '').trim();

			_str.split(';').forEach((el) => {
				const [property, value] = el.split(':');
				console.log(property, value);
				if (!property) return;

				const formattedProperty = formatStringToCamelCase(
					property.trim()
				);
				style[formattedProperty] = value.trim();
			});
		} catch (error) {
			return 'Invalid input';
		}

		return style;
	};

	useEffect(() => {
		resizeTextArea();
	}, [currentInput]);

	return (
		<>
			<h1 className='text-4xl text-center mt-4 mb-20 font-bold'>
				HTML to JSX styles
			</h1>
			<div className='h-screen  flex  items-center flex-col max-w-4xl w-5/6 mx-auto'>
				<h2 className='text-2xl mb-2'>Input</h2>
				<textarea
					ref={textAreaRef}
					rows='1'
					className='resize-none shadow-md rounded-md outline-none  focus:rounded-xl transition-all p-2 w-full mb-12'
					value={currentInput}
					onChange={(e) => setCurrentInput(e.target.value)}
				></textarea>
				<h2 className='text-2xl mb-2'>Result</h2>
				<div className='shadow-md rounded-md p-2 w-full bg-white min-h-[200px]'>
					{JSON.stringify(getStyleObjectFromString(currentInput))}
				</div>
			</div>
		</>
	);
}

export default App;

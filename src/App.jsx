import { useEffect, useState, useRef } from 'react';

function App() {
	const [currentInput, setCurrentInput] = useState('');
	const textAreaRef = useRef();

	const resizeTextArea = () => {
		textAreaRef.current.style.height = 'auto';
		textAreaRef.current.style.height =
			textAreaRef.current.scrollHeight + 'px';
	};

	function parseInlineStyle(style) {
		const template = document.createElement('template');
		template.setAttribute('style', style);
		return Object.entries(template.style)
			.filter(([key]) => !/^[0-9]+$/.test(key))
			.filter(([, value]) => Boolean(value))
			.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
	}

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
					<pre>{JSON.stringify(parseInlineStyle(currentInput))}</pre>
				</div>
			</div>
		</>
	);
}

export default App;

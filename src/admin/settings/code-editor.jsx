import { useRef, useEffect } from '@wordpress/element';

/* CodeEditor is one-way bound; it will set the editor content to the value of the
'content' prop when the instance is created, but it will not update the editor content
for subsequent changes to the 'content' prop. The function given in the 'setContent'
prop will be called when the editor content changes. */
const CodeEditor = ({ content = "", setContent }) => {
	const areaRef = useRef(),
		instanceRef = useRef();

	useEffect( () => {
		instanceRef.current = wp.codeEditor.initialize( areaRef.current );

		if ( typeof instanceRef.current === 'object' && instanceRef.current.hasOwnProperty( 'codemirror' ) ) {
			instanceRef.current.codemirror.on( 'change', ( instance, event ) => {
				setContent( instanceRef.current.codemirror.getValue() );
			} );
		}
	}, [] );

	return (
		<div className="revpress code-editor">
			<textarea ref={ areaRef } value={ content } />
		</div>
	);
};

export default CodeEditor;

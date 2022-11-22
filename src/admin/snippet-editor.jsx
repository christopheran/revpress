import { useRef, useEffect } from '@wordpress/element'

const SnippetEditor = props => {
    const areaRef = useRef();

    useEffect(() => {
        wp.codeEditor.initialize(areaRef.current);
    }, []);

    return (
        <div className="revpress snippet-editor">
            <textarea ref={areaRef}></textarea>
        </div>
    );
};

export default SnippetEditor
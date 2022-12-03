import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { BaseControl, TextControl, Button } from '@wordpress/components';

import CodeEditor from './code-editor';

const SnippetEditor = ({ snippet, cancel }) => {
    const [ content, setContent ] = useState( snippet ? snippet.content : "" );
    const [ name, setName ] = useState( snippet ? snippet.name : "" );

    return (
        <section className="revpress snippet-editor">
            <header>
                <h2>{ __( 'Add Snippet', 'revpress' ) }</h2>
            </header>

            <div className="field">
                <BaseControl
                    label={ __( 'Snippet Code', 'revpress' ) }
                    help={ __( 'Paste the snippet of code from Publisher Center here.') }>
                    <CodeEditor
                        content={ content }
                        setContent={ setContent } />
                </BaseControl>
            </div>

            <div className="field">
                <p><em>Snippet inclusion filters here.</em></p>
            </div>

            <div className="field">
                <TextControl
                    value={ name }
                    onChange={ ( newName ) => setName( newName ) }
                    label={ __( 'Name', 'revpress' ) }
                    help={ __( 'The snippet name helps you recognize the snippet in a list. It is recommeneded to use the product ID for this snippet from Publisher Center.', 'revpress' ) }
                />
            </div>

            <div className="submit">
                <Button
                    variant="primary">
                    { __( 'Save Snippet', 'revpress' ) }
                </Button>

                <Button
                    variant="secondary"
                    onClick={ ( event ) => cancel() }>
                    { __( 'Cancel', 'revpress' ) }
                </Button>
            </div>
        </section>
    );
};

export default SnippetEditor;
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { BaseControl, TextControl, Button, ToggleControl } from '@wordpress/components';

import CodeEditor from './code-editor';

const SnippetEditor = ({ snippet, cancel, saveSnippet, savingSnippet }) => {
    const [ enabled, setEnabled ] = useState( snippet ? snippet.enabled : true );
    const [ content, setContent ] = useState( snippet ? snippet.content : "" );
    const [ name, setName ] = useState( snippet ? snippet.name : "" );

    const save = () => {
        const snippetData = {
            enabled,
            content,
            name
        };

        if ( snippet ) {
            snippetData.id = snippet.id;
        }

        saveSnippet( snippetData );
    };

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

            <div className="field">
                <ToggleControl
                    label={ __( 'Show Snippet', 'revpress' ) }
                    checked={ enabled }
                    help={ __( 'When a snippet is not enabled, it is no longer included on the site.' ) }
                    onChange={ ( checked ) => setEnabled( checked ) }
                />
            </div>

            <div className="submit">
                <Button
                    variant="primary"
                    onClick={ ( event ) => save() }
                    disabled={ savingSnippet }
                    isBusy={ savingSnippet }
                >
                    { __( 'Save Snippet', 'revpress' ) }
                </Button>

                <Button
                    variant="secondary"
                    onClick={ ( event ) => cancel() }
                    disabled={ savingSnippet }
                >
                    { __( 'Cancel', 'revpress' ) }
                </Button>
            </div>
        </section>
    );
};

export default SnippetEditor;
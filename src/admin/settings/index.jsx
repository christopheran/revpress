import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Spinner, Button } from '@wordpress/components';

import SnippetList from './snippet-list';
import SnippetEditor from './snippet-editor';
import GeneralSettings from './general';

const Settings = ( { snippets, doSnippetAction, categories } ) => {
	const [ editingSnippet, setEditingSnippet ] = useState();

	const saveSnippet = ( snippet ) => {
		doSnippetAction( {
			type: snippet.id ? 'update_snippet' : 'add_snippet',
			snippet
		} );
	};

	const deleteSnippet = ( snippetId ) => {
		doSnippetAction( {
			type: 'delete_snippet',
			snippetId
		} );
	};

	if ( editingSnippet !== undefined ) {
		return (
			<div className="revpress settings">
				<SnippetEditor
					snippet={ editingSnippet }
					cancel={ () => setEditingSnippet( undefined ) }
					saveSnippet={ saveSnippet }
					savingSnippet={ snippets.saving }
					categories={ categories } />
			</div>
		);
	}

	return (
		<div className="revpress settings">
			<section>

				<header>
					<h2>{ __( 'Snippets', 'revpress' ) }</h2>
					<div className="actions">
						<Button
							onClick={ ( event ) => setEditingSnippet( null ) }
							variant="secondary"
							icon="plus">
							{ __( 'New Snippet', 'revpress' ) }
						</Button>
					</div>
				</header>

				{ snippets.loading ? (
					<div className="loading">
						<Spinner style={{ height: '50px', width: '50px' }} />
					</div>
				) : (
					<SnippetList
						snippets={ snippets }
						editSnippet={ ( snippet ) => setEditingSnippet( snippet ) }
						deleteSnippet={ deleteSnippet }
					/>
				) }

			</section>

			<section>

				<header>
					<h2>{ __( 'Settings', 'revpress' ) }</h2>
				</header>

				<GeneralSettings />

			</section>
		</div>
	);
};

export default Settings;

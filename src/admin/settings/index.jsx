import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { CheckboxControl, Spinner, Button } from '@wordpress/components';

import * as revpressAPI from '../../api';
import SnippetList from './snippet-list';
import SnippetEditor from './snippet-editor';
import GeneralSettings from './general';

const Settings = () => {
	const [ loadingSnippets, setLoadingSnippets ] = useState( false );
	const [ snippets, setSnippets ] = useState( [] );
	const [ editingSnippet, setEditingSnippet ] = useState();
	const [ savingSnippet, setSavingSnippet ] = useState(false);
	const [ deletingSnippets, setDeletingSnippets ] = useState( [] );

	useEffect( () => {
		setLoadingSnippets( true );

		revpressAPI.searchSnippets()
			.then( setSnippets )
			.catch( console.error )
			.finally( () => setLoadingSnippets( false ) );
	}, [] );

	const saveSnippet = ( snippet ) => {
		setSavingSnippet( true );

		if ( snippet.id ) {
			revpressAPI.updateSnippet( snippet )
				.then( ( result ) => {
					const newSnippets = snippets.filter( _snippet => _snippet.id != snippet.id ).concat( result );
					setSnippets( newSnippets );
				} )
				.catch( console.error )
				.finally( () => setSavingSnippet( false ) );
		} else {
			revpressAPI.createSnippet( snippet )
				.then( ( result ) => {
					const newSnippets = snippets.concat( result );
					setSnippets( newSnippets );
				} )
				.catch( console.error )
				.finally( () => setSavingSnippet( false ) );
		}
	};

	const deleteSnippet = ( snippetId ) => {
		const newDeletingSnippets = deletingSnippets.concat( snippetId );
		setDeletingSnippets( newDeletingSnippets );

		revpressAPI.deleteSnippet( snippetId )
			.then( ( result ) => {
				const newSnippets = snippets.filter( snippet => snippet.id != snippetId );
				setSnippets( newSnippets );
			})
			.catch( console.error )
			.finally( () => {
				const newDeletingSnippets = deletingSnippets.filter( snippetToDelete => snippetToDelete != snippetId );
				setDeletingSnippets( newDeletingSnippets );
			} );
	};

	if ( editingSnippet !== undefined ) {
		return (
			<div className="revpress settings">
				<SnippetEditor
					snippet={ editingSnippet }
					cancel={ () => setEditingSnippet( undefined ) }
					saveSnippet={ saveSnippet }
					savingSnippet={ savingSnippet } />
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
							onClick={ (event) => setEditingSnippet( null ) }
							variant="secondary"
							icon="plus">
							{ __( 'New Snippet', 'revpress' ) }
						</Button>
					</div>
				</header>

				{ loadingSnippets ? (
					<div className="loading">
						<Spinner style={{ height: '50px', width: '50px' }} />
					</div>
				) : (
					<SnippetList
						snippets={ snippets }
						editSnippet={ (snippet) => setEditingSnippet( snippet ) }
						deleting={ deletingSnippets }
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

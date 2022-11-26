import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import Section from './section';
import SnippetList from './snippet-list';

const Settings = () => {
	const [ loadingSnippets, setLoadingSnippets ] = useState( false );
	const [ snippets, setSnippets ] = useState( [] );
	// const [ settings, setSettings ] = useState( {} );
	// const [ editingSnippet, setEditingSnippet ] = useState();

	useEffect( () => {
		setLoadingSnippets( true );

		apiFetch( { path: '/revpress/v1/snippets' } )
		.then( setSnippets )
		.catch( console.error )
		.finally( () => setLoadingSnippets( false ) );
	}, [] );

	return (
		<div className="revpress settings">
			<Section heading={ __( 'Snippets', 'revpress' ) }>
				{ loadingSnippets ? (
					<p>Loading...</p>
				) : (
					<SnippetList snippets={ snippets } />
				) }
			</Section>

			<Section heading={ __( 'Settings', 'revpress' ) }>
				<div className="field">
					<label htmlFor="fake-select">
						{ __( 'Settings Access', 'revpress' ) }
					</label>
					<p className="description">
						{ __(
							'Configure which user roles can modify these settings.',
							'revpress'
						) }
					</p>
					<input id="fake-select" type="checkbox" disabled />
					Administrator
				</div>
			</Section>
		</div>
	);
};

export default Settings;

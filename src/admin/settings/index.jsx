import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { CheckboxControl, Spinner, Button } from '@wordpress/components';

import SnippetList from './snippet-list';
import SnippetEditor from './snippet-editor';

const Settings = () => {
	const [ loadingSnippets, setLoadingSnippets ] = useState( false );
	const [ snippets, setSnippets ] = useState( [] );
	const [ rolesAllowed, setRolesAllowed ] = useState( window.revpress.roles );
	const [ editingSnippet, setEditingSnippet ] = useState();

	useEffect( () => {
		setLoadingSnippets( true );

		apiFetch( { path: '/revpress/v1/snippets' } )
		.then( setSnippets )
		.catch( console.error )
		.finally( () => setLoadingSnippets( false ) );
	}, [] );

	return (
		<div className="revpress settings">
			{ editingSnippet === undefined ? (
				<>
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
								<Spinner
									style={{
										height: '50px',
										width: '50px'
									}} />
							</div>
						) : (
							<SnippetList
								editSnippet={ (snippet) => setEditingSnippet( snippet ) }
								snippets={ snippets } />
						) }
					</section>

					<section>
						<header>
							<h2>{ __( 'Settings', 'revpress' ) }</h2>
						</header>
						<div className="field">
							<h3>
								{ __( 'Settings Access', 'revpress' ) }
							</h3>
							<p className="description">
								{ __(
									'Configure which user roles can access this settings page. Only Administrators and Super Administrators can modify this setting.',
									'revpress'
								) }
							</p>
							<ul>
								{ rolesAllowed.map( ( role ) => (
									<li key={ role.slug }>
										<CheckboxControl
											__nextHasNoMarginBottom
											label={ role.name }
											disabled={ role.slug === 'administrator' }
											checked={ role.allowed }
											onChange={ ( isAllowed ) => {
												const newRolesAllowed = [ ...rolesAllowed ];
												const targetRole = newRolesAllowed.find( ( candidate ) => candidate.slug === role.slug );

												if ( targetRole ) {
													targetRole.allowed = isAllowed;
												}

												setRolesAllowed( newRolesAllowed );
											} }
										/>
									</li>
								))}
							</ul>
						</div>
					</section>
				</>
			) :
			<SnippetEditor
				snippet={ editingSnippet }
				cancel={ () => setEditingSnippet(undefined) } />
		}
		</div>
	);
};

export default Settings;

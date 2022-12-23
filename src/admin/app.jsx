import { render, useCallback, useEffect, useReducer, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import './app.scss';

import Header from './header';
import Settings from './settings';
import Guide from './guide';
import Sidebar from './sidebar';

import * as RevpressAPI from '../api';

function snippetsReducer( snippets, action ) {
	switch ( action.type ) {
		case 'load_snippets':
			return {
				...snippets,
				loading: true
			};
		case 'load_snippets_success':
			return {
				...snippets,
				loading: false,
				all: action.snippets
			};
		case 'load_snippets_failed':
			return {
				...snippets,
				loading: false
			};



		case 'add_snippet':
		case 'update_snippet':
			return {
				saving: true,
				...snippets
			};
		case 'add_snippet_success':
			return {
				all: snippets.all.concat( action.snippet ),
				saving: false,
				...snippets
			};
		case 'update_snippet_success':
			return {
				all: snippets.all.filter( snippet => snippet.id != action.snippet.id ).concat( action.snippet ),
				saving: false,
				...snippets
			};
		case 'add_snippet_failed':
		case 'update_snippet_failed':
			return {
				saving: false,
				...snippets
			};



		case 'delete_snippet':
			return {
				deleting: snippets.all.concat( action.snippetId ),
				...snippets
			};
		case 'delete_snippet_success':
			return {
				all: snippets.all.filter( snippet => snippet.id != action.snippetId ),
				deleting: snippets.deleting.filter( snippetId => snippetId != action.snippetId ),
				...snippets
			};
		case 'delete_snippet_failed':
			return {
				deleting: snippets.deleting.filter( snippetId => snippetId != action.snippetId ),
				...snippets
			};



		default:
			return snippets;
	}
}

function buildTaxonomyTree( parent, categories ) {
	const tree = [];
	categories.forEach( ( category ) => {
		if ( category.parent == parent ) {
			const node = [ category, buildTaxonomyTree( category.id, categories ) ];
			tree.push( node );
		}
	} );

	return tree;
}

function categoriesReducer( categories, action ) {
	switch ( action.type ) {
		case 'load_categories':
			return {
				...categories,
				loading: true
			};
		case 'load_categories_success':
			return {
				loading: false,
				byId: action.categories.reduce( ( byId, category ) => {
					byId[ category.id ] = category;
					return byId;
				}, {} ),
				tree: buildTaxonomyTree( 0, action.categories )
			};
		case 'load_categories_failed':
			return {
				...categories,
				loading: false
			};
		default:
			return categories;
	}
}

const initialSnippetsData = {
	all: [],
	loading: false,
	saving: false,
	deleting: []
};

const initialCategoriesData = {
	byId: {},
	tree: [],
	loading: false
};

const App = () => {
	const [ view, setView ] = useState( 'settings' );
	const [ snippets, snippetDispatch ] = useReducer( snippetsReducer, initialSnippetsData );
	const [ categories, categoriesDispatch ] = useReducer( categoriesReducer, initialCategoriesData );

	const doSnippetAction = useCallback( ( action ) => {
		switch ( action.type ) {
			case 'load_snippets':
				snippetDispatch( action );
				RevpressAPI.searchSnippets()
					.then( ( snippets ) => {
						snippetDispatch( { type: 'load_snippets_success', snippets } );
					} )
					.catch( ( error ) => {
						console.error( error );
						snippetDispatch( { type: 'load_snippets_failed' } );
					} );
				break;
			case 'add_snippet':
				snippetDispatch( action );
				RevpressAPI.createSnippet( action.snippet )
					.then( ( snippet ) => {
						snippetDispatch( { type: 'add_snippet_success', snippet } );
					} )
					.catch( ( error ) => {
						console.error( error );
						snippetDispatch( { type: 'add_snippet_failed', snippet: action.snippet } );
					} );
				break;
			case 'update_snippet':
				snippetDispatch( action );
				RevpressAPI.updateSnippet( action.snippet )
					.then( ( snippet ) => {
						snippetDispatch({ type: 'update_snippet_success', snippet } );
					} )
					.catch( ( error ) => {
						console.error( error );
						snippetDispatch( { type: 'update_snippet_failed', snippet: action.snippet });
					} );
				break;
			case 'delete_snippet':
				snippetDispatch( action );
				RevpressAPI.deleteSnippet( action.snippetId )
					.then( ( snippet ) => {
						snippetDispatch( { type: 'delete_snippet_success', snippetId: snippet.id } );
					} )
					.catch( ( error ) => {
						console.error( error );
						snippetDispatch( { type: 'delete_snippet_failed', snippetId: action.snippetId } );
					} );
				break;
		}
	}, [] );

	useEffect( () => {
		doSnippetAction( { type: 'load_snippets' } );

		categoriesDispatch( { type: 'load_categories' } );
		apiFetch( { path: 'wp/v2/categories' } )
			.then( ( categories ) => {
				categoriesDispatch( { type: 'load_categories_success', categories } );
			} )
			.catch( ( error ) => {
				console.error( error );
				categoriesDispatch( { type: 'load_categories_failed' } );
			} )
	}, [] );

	return (
		<>
			<Header current={ view } navigate={ setView } />
			<section className="content">
				{
					view === 'settings'
						? <Settings
							snippets={ snippets }
							doSnippetAction={ doSnippetAction }
							categories={ categories } />
						: <Guide />
				}
				<Sidebar />
			</section>
		</>
	);
};

window.addEventListener( 'load', () => {
	const root = document.getElementById( 'revpress' );
	render( <App />, root );
} );

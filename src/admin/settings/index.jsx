import { __ } from '@wordpress/i18n';

import Section from './section';
import SnippetList from './snippet-list';

const snippets = [
	{
		id: 'abc123',
		name: 'Snippet one',
		content: '<script>console.log("This is the snippet");</script>',
		categories: [],
		tags: [],
		isSitewide: true,
		isAllPosts: false,
	},
	{
		id: 'def456',
		name: 'Snippet two',
		content: '<script>console.log("This is another snippet");</script>',
		categories: [],
		tags: [],
		isSitewide: false,
		isAllPosts: true,
	},
	{
		id: 'def456',
		name: 'Snippet three',
		content: '<script>console.log("This is yet another snippet");</script>',
		categories: ['uncategorized'],
		tags: ['paywalled'],
		isSitewide: false,
		isAllPosts: false,
	},
];

const Settings = () => {
	// const [ settings, setSettings ] = useState( {} );
	// const [ editingSnippet, setEditingSnippet ] = useState();

	// useEffect( () => {
	// 	console.log( 'foobar' );
	// }, [] );

	return (
		<div className="revpress settings">
			<Section heading={ __( 'Snippets', 'revpress' ) }>
				<SnippetList snippets={ snippets } />
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

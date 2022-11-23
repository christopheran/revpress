import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';

const SnippetCard = ( {
	// id,
	name,
	// content,
	// categories,
	// tags,
	isSitewide,
	// isAllPosts,
} ) => (
	<div className="revpress snippet-card">
		<div className="identifier">
			<strong>{ name }</strong>
		</div>

		<div className="constraints">
			{ isSitewide && (
				<div className="constraint sitewide">
					<div className="icon">
						<Dashicon icon="admin-site" />
					</div>
					<p>
						{ __( 'This snippet is active on all pages of this site.', 'revpress' ) }
					</p>
				</div>
			) }
		</div>
	</div>
);

const SnippetList = ( { snippets = [] } ) => (
	<div className="revpress snippet-list">
		{ snippets.map( ( snippet ) => (
			<SnippetCard key={ snippet.id } { ...snippet } />
		) ) }
	</div>
);

export default SnippetList;

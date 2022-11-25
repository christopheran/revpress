import { __, sprintf } from '@wordpress/i18n';
import { Dashicon, Button } from '@wordpress/components';

const SnippetList = ( { snippets = [] } ) => (
	<ul className="revpress snippet-list">
		{ snippets.map( ( snippet ) => (
			<li key={ snippet.id }>
				<div className="identifier">
					<strong>{ snippet.name }</strong>
				</div>

				<div className="constraints">
					{ snippet.isSitewide && (
						<div className="constraint sitewide">
							<div className="icon">
								<Dashicon icon="admin-site" />
							</div>
							<p>
								{ __( 'This snippet is active on all pages of this site.', 'revpress' ) }
							</p>
						</div>
					) }
					{ snippet.isAllPosts && (
						<div className="constraint allposts">
							<div className="icon">
								<Dashicon icon="admin-post" />
							</div>
							<p>
								{ __( 'This snippet is active on all posts.', 'revpress' ) }
							</p>
						</div>
					) }
					{ ! snippet.isSitewide && ! snippet.isAllPosts && snippet.categories.length > 0 && (
						<div className="constraint categories">
							<div className="icon">
								<Dashicon icon="category" />
							</div>
							<p>
								{ sprintf( __( 'This snippet is active on posts in these categories: %s', 'revpress' ), snippet.categories.join(', ') ) }
							</p>
						</div>
					) }
					{ ! snippet.isSitewide && ! snippet.isAllPosts && snippet.tags.length > 0 && (
						<div className="constraint tags">
							<div className="icon">
								<Dashicon icon="tag" />
							</div>
							<p>
								{ sprintf( __( 'This snippet is active on posts with these tags: %s', 'revpress' ), snippet.tags.join(', ') ) }
							</p>
						</div>
					) }
				</div>

				<div className="actions">
					<Button variant="secondary" icon="edit">{ __( 'Edit', 'revpress' ) }</Button>
					<Button variant="secondary" icon="trash" isDestructive>{ __( 'Delete', 'revpress' ) }</Button>
				</div>
			</li>
		) ) }
	</ul>
);

export default SnippetList;

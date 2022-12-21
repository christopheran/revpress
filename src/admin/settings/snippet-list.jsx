import { __, sprintf } from '@wordpress/i18n';
import { Dashicon, Button } from '@wordpress/components';

const SnippetList = ( { snippets, editSnippet, deleteSnippet } ) => (
	<ul className="revpress snippet-list">
		{ snippets.all.length < 1 && (
			<li>
				<div className="no-results">
					<p>{ __( 'There are no snippets yet.', 'revpress' ) }</p>
				</div>
			</li>
		)}

		{ snippets.all.map( ( snippet ) => {
			const deletingSnippet = ( snippets.deleting.indexOf( snippet.id ) >= 0 );

			return (
				<li key={ snippet.id }>
					<div className="identifier">
						<strong>{ snippet.name }</strong>
					</div>

					<div className="constraints">
						{ snippet.constraints.whole_site && (
							<div className="constraint sitewide">
								<div className="icon">
									<Dashicon icon="admin-site" />
								</div>
								<p>
									{ __( 'This snippet is active on all pages of this site.', 'revpress' ) }
								</p>
							</div>
						) }
						{ /* snippet.is_all_posts && (
							<div className="constraint allposts">
								<div className="icon">
									<Dashicon icon="admin-post" />
								</div>
								<p>
									{ __( 'This snippet is active on all posts.', 'revpress' ) }
								</p>
							</div>
						) }
						{ ! snippet.is_sitewide && ! snippet.is_all_posts && snippet.categories.length > 0 && (
							<div className="constraint categories">
								<div className="icon">
									<Dashicon icon="category" />
								</div>
								<p>
									{ sprintf( __( 'This snippet is active on posts in these categories: %s', 'revpress' ), snippet.categories.join(', ') ) }
								</p>
							</div>
						) }
						{ ! snippet.is_sitewide && ! snippet.is_all_posts && snippet.tags.length > 0 && (
							<div className="constraint tags">
								<div className="icon">
									<Dashicon icon="tag" />
								</div>
								<p>
									{ sprintf( __( 'This snippet is active on posts with these tags: %s', 'revpress' ), snippet.tags.join(', ') ) }
								</p>
							</div>
						) */ }
					</div>

					{/* <div className="activation">
						<ToggleControl
							checked
							label="Activate snippet"

						/>
					</div> */}

					<div className="actions">
						<Button
							onClick={ ( event ) => editSnippet( snippet ) }
							variant="secondary"
							icon="edit">
							{ __( 'Edit', 'revpress' ) }
						</Button>
						<Button
							onClick={ ( event ) => deleteSnippet( snippet.id ) }
							variant="secondary"
							icon="trash"
							isDestructive
							disabled={ deletingSnippet }
							isBusy={ deletingSnippet }>
							{ __( 'Delete', 'revpress' ) }
						</Button>
					</div>
				</li>
			);
		} ) }
	</ul>
);

export default SnippetList;

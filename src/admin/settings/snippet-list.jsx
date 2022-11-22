const SnippetCard = ( {
	// id,
	name,
	// content,
	// categories,
	// tags,
	// isSitewide,
	// isAllPosts,
} ) => <div className="revpress snippet-class">{ name }</div>;

const SnippetList = ( { snippets = [] } ) => (
	<div className="revpress snippet-list">
		{ snippets.map( ( snippet ) => (
			<SnippetCard key={ snippet.id } { ...snippet } />
		) ) }
	</div>
);

export default SnippetList;

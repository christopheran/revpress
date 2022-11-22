const Section = ( { heading, children } ) => (
	<section>
		<h2>{ heading }</h2>
		<hr />
		{ children }
	</section>
);

export default Section;

import { __ } from '@wordpress/i18n';

const tabs = [
	{ id: 'settings', label: __( 'Settings', 'revpress' ) },
	{ id: 'guide', label: __( 'Guide', 'revpress' ) },
];

const Navigation = ( { current, navigate } ) => (
	<nav>
		<ol>
			{ tabs.map( ( tab ) => (
				<li
					key={ tab.id }
					className={ tab.id === current ? 'active' : '' }
				>
					<button
						onClick={ () =>
							current.id !== tab.id && navigate( tab.id )
						}
					>
						{ tab.label }
					</button>
				</li>
			) ) }
		</ol>
	</nav>
);

export default Navigation;

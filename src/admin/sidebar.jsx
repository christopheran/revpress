import { RawHTML } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Button, Icon } from '@wordpress/components';
import { ReactComponent as Logo } from '../logo.svg';

const Sidebar = () => (
	<aside className="revpress sidebar">
		<div className="identity">
			<a href="https://rev.press">
				<Logo />
				<p>https://Rev.Press</p>
			</a>
		</div>

		<div className="greeting">
			<h2>{ __( 'Welcome to RevPress!', 'revpress' ) }</h2>
			<p className="green">
				<em>
					<strong>{ __( 'The easiest way to add Subscribe with Google to your site!', 'revpress' ) }</strong>
				</em>
			</p>
		</div>

		<div className="join">
			<h2>{ __( 'Join Rev.Press', 'revpress' ) }</h2>

			<p className="green">
				<em>
					<strong>{ __( 'Learn. Share. Succeed.') }</strong>
				</em>
			</p>

			<div className="offer">
				<p>{ __( 'For just $10 / month:', 'revpress' ) }</p>

				<ul>
					<li>
						<RawHTML>
							{ __( 'Get the latest <em>Subscribe with Google</em> news, analysis, tips, ideas and advice.', 'revpress' ) }
						</RawHTML>
					</li>
					<li>
						{ __( 'Participate in an amazing community of publishers that can help you grow your reader revenue earnings.', 'revpress' ) }
					</li>
					<li>
						{ __( 'Get answers, ideas, and share your knowledge on our member-only forum.', 'revpress' ) }
					</li>
					<li>
						<RawHTML>
							{ __( 'Experience what it\'s like to be an actual <em>Subscribe with Google</em> subscriber.', 'revpress' ) }
						</RawHTML>
					</li>
					<li>
						{ __( 'Get full access to the Pro version of RevPress when available.', 'revpress' ) }
					</li>
					<li>
						{ __( 'And support the ongoing development of RevPress and Rev.Press!', 'revpress' ) }
					</li>
				</ul>
			</div>

			<p className="green">
				<em>
					<strong>{ __( 'Knowledge is the key to success!', 'revpress' ) }</strong>
				</em>
			</p>

			<div>
				<Button
					variant="primary"
					href="https://rev.press/join">
					{ __( 'Join Now', 'revpress' ) }
					<Icon icon="arrow-right-alt" />
				</Button>
			</div>
		</div>

		<div className="support">
			<h2>{ __( 'Need Help With RevPress?', 'revpress' ) }</h2>

			<p>{ __( 'Be sure to visit the "Guide" tab on this page for information and instructions.', 'revpress' ) }</p>
			<p>
				<RawHTML>
					{ sprintf( __( 'Free support for RevPress users is available through the <a href="%s">WordPress Forum</a>.', 'revpress' ), 'https://wordpress.org/support/plugin/revpress' ) }
				</RawHTML>
			</p>
			<p>
				<RawHTML>
					{ sprintf( __( 'Premium support for RevPress Pro members is available through the <a href="%s">RevPress Forum</a>.', 'revpress' ), 'https://rev.press/forum' ) }
				</RawHTML>
			</p>

			<h2>
				<RawHTML>
					{ __( 'Need Help With <br/><em>Subscribe with Google</em>?', 'revpress' ) }
				</RawHTML>
			</h2>

			<p>
				<RawHTML>
					{
						sprintf(
							__( 'If you need help with <em>Subscribe with Google</em> (applying, billing, managing subscribers, payments), visit the <a href="%s">Google Publisher Center Help Forum</a> or contact <a href="%s">Google SwG Publisher Forum</a>.', 'revpress' ),
							'https://rev.press/forum',
							'https://support.google.com/news/publisher-center/contact/swg_default'
						)
					}
				</RawHTML>
			</p>
		</div>
	</aside>
);

export default Sidebar;

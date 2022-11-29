import { ReactComponent as Logo } from '../logo.svg';
import Navigation from './navigation';

const Header = ({ current, navigate }) => (
	<header>
		<Logo width={ 200 } height={ 80 } />
		<Navigation current={ current } navigate={ navigate } />
	</header>
);

export default Header;

import { render, useState } from '@wordpress/element'
import './app.scss'

import Header from './header'
import Navigation from './navigation'
import Settings from './settings'
import Guide from './guide'
import Sidebar from './sidebar'

const App = props => {
    const [view, setView] = useState('settings');

    return (
        <>
            <Header />
            <Navigation current={view} navigate={setView} />
            <section className="content">
                {view === 'settings' ? <Settings /> : <Guide />}
                <Sidebar />
            </section>
        </>
    );
};

window.addEventListener('load', () => {
    const root = document.getElementById('revpress');

    render(<App />, root);
});

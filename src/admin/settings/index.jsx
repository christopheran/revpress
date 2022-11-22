import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";

import Section from './section'
import SnippetList from './snippet-list';

const snippets = [
    {
        id: 'abc123',
        name: "Something",
        content: '<script>console.log("This is the snippet");</script>',
        categories: [],
        tags: [],
        isSitewide: false,
        isAllPosts: false
    }
];

const Settings = (props) => {
    const [ settings, setSettings ] = useState( {} );
    const [ editingSnippet, setEditingSnippet ] = useState();

    useEffect( () => {
        console.log("foobar");
    }, [] );

    return (
        <div className="revpress settings">
            
            <Section heading={ __( 'Snippets', 'revpress' ) }>
                <SnippetList snippets={ snippets } />
            </Section>

            <Section heading={ __( 'Settings', 'revpress' ) }>
                <div className="field">
                    <label>{ __( 'Settings Access', 'revpress' ) }</label>
                    <p className="description">{ __( 'Configure which user roles can modify these settings.', 'revpress' ) }</p>
                    <em>Roles selector here.</em>
                </div>
            </Section>

        </div>
    )
};

export default Settings;
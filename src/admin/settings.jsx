import { __ } from '@wordpress/i18n'

import SnippetEditor from "./snippet-editor";

const Settings = (props) => (
    <div className="settings">
        <div className="field snippet-editor">
            <label>{__('Code snippet', 'revpress')}</label>
            <p className="description">{__('Paste the code snippet provided by Google.', 'revpress')}</p>
            <SnippetEditor />
        </div>
    </div>
);

export default Settings;
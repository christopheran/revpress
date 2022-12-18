import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { CheckboxControl } from "@wordpress/components";

const GeneralSettings = ( props ) => {
    const [ rolesAllowed, setRolesAllowed ] = useState( window.revpress.roles );

    return (
        <div className="revpress general-settings">

            <div className="field settings-access">
                <h3>
				    { __( 'Settings Access', 'revpress' ) }
				</h3>
				<p className="description">
					{ __(
						'Configure which user roles can access this settings page. Only Administrators and Super Administrators can modify this setting.',
						'revpress'
					) }
				</p>
				<ul>
					{ rolesAllowed.map( ( role ) => (
						<li key={ role.slug }>
							<CheckboxControl
								__nextHasNoMarginBottom
								label={ role.name }
								disabled={ role.slug === 'administrator' }
								checked={ role.allowed }
								onChange={ ( isAllowed ) => {
									const newRolesAllowed = [ ...rolesAllowed ];
									const targetRole = newRolesAllowed.find( ( candidate ) => candidate.slug === role.slug );

									if ( targetRole ) {
										targetRole.allowed = isAllowed;
									}

									setRolesAllowed( newRolesAllowed );
								} }
							/>
						</li>
					) ) }
				</ul>
            </div>

        </div>
    );
};

export default GeneralSettings;
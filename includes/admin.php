<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

/**
 * Register RevPress admin menu.
 * 
 * @since 0.1.0
 */
function revpress_register_admin_menu() {
    add_options_page(
        __( 'RevPress Settings', 'revpress' ),
        __( 'RevPress Settings', 'revpress' ),
        'manage_revpress',
        'revpress',
        'revpress_admin_page'
    );
}

add_action( 'admin_menu', 'revpress_register_admin_menu' );

/**
 * Get an array of roles including whether the role can manage RevPress.
 * 
 * @since 0.1.0
 * 
 * @return array
 */
function revpress_get_roles_setting() {
    $roles = wp_roles();
    $roles_setting = array();

    foreach ( $roles->get_names() as $role_slug => $role_name ) {
        $role = $roles->get_role( $role_slug );

        // WP_Roles::get_role can return null.
        if ( ! $role ) {
            continue;
        }

        $roles_setting[] = array(
            'slug'      => $role_slug,
            'name'      => $role_name,
            'allowed'   => $role->has_cap( 'manage_revpress' )
        );
    }

    return $roles_setting;
}

/**
 * Output RevPress admin menu page.
 * 
 * @since 0.1.0
 */
function revpress_admin_page() {
    echo '<div class="wrap"><div id="revpress"></div></div>';
}

/**
 * Include JS and CSS assets on RevPress admin page.
 * 
 * @since 0.1.0
 */
function revpress_admin_assets() {
    if ( isset( $_GET['page'] ) && $_GET['page'] === 'revpress' ) {
        wp_register_script( 'revpress-admin', REVPRESS_URL . 'assets/app.js', array( 'wp-element', 'wp-i18n', 'wp-components', 'wp-api-fetch' ) );
        wp_localize_script( 'revpress-admin', 'revpress', array(
            'roles' => revpress_get_roles_setting()
        ) );
        wp_enqueue_script( 'revpress-admin' );

        wp_enqueue_style( 'revpress-admin', REVPRESS_URL . 'assets/app.css', array( 'wp-components' ) );

        // Include the code editor for modifying snippets.
        wp_enqueue_code_editor( array( 'type' => 'text/html' ) );
    }
}

add_action( 'admin_enqueue_scripts', 'revpress_admin_assets' );
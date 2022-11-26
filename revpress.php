<?php
/**
 * Plugin Name: RevPress
 * Plugin URI: https://rev.press
 * Version: 0.1.0
 * Author: RevPress
 * Author URI: https://rev.press
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

if ( ! defined( 'REVPRESS_VERSION' ) ) {
    define( 'REVPRESS_VERSION', '0.1.0' );
}

if ( ! defined( 'REVPRESS_PATH' ) ) {
    define( 'REVPRESS_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'REVPRESS_URL' ) ) {
    define( 'REVPRESS_URL', plugin_dir_url( __FILE__ ) );
}

if ( is_admin() ) {
    require_once REVPRESS_PATH . 'includes/admin.php';
}

require_once REVPRESS_PATH . 'includes/rest-api.php';

function revpress_activate() {
    $privileged_roles = array( 'administrator' );
    $roles = wp_roles();

    foreach ( $privileged_roles as $privileged_role ) {
        $roles->add_cap( $privileged_role, 'manage_revpress', true );
    }
}

register_activation_hook( __FILE__, 'revpress_activate' );

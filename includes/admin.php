<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

function revpress_admin_init() {
    
}

add_action( 'admin_init', 'revpress_admin_init' );

function revpress_register_admin_menu() {
    add_options_page(
        __( 'RevPress Settings', 'revpress' ),
        __( 'RevPress Settings', 'revpress' ),
        'manage_options',
        'revpress',
        'revpress_settings_page'
    );
}

add_action( 'admin_menu', 'revpress_register_admin_menu' );

function revpress_settings_page() {
    echo '<div class="wrap"><div id="revpress"></div></div>';
}

function revpress_admin_assets() {
    wp_enqueue_script( 'revpress-admin', REVPRESS_URL . 'assets/app.jsx.js', array( 'wp-element', 'wp-i18n' ) );
    wp_enqueue_style( 'revpress-admin', REVPRESS_URL . 'assets/app.jsx.css' );
}

add_action( 'admin_enqueue_scripts', 'revpress_admin_assets' );
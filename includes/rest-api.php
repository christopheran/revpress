<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

function revpress_api_init() {
    register_rest_route(
        'revpress/v1',
        'snippets',
        'args'  => array(
            'methods'               => 'GET',
            'callback'              => 'revpress_api_list_snippets',
            'permission_callback'   => 'revpress_api_permission_check'
        )
    );
}

add_action( 'rest_api_init', 'revpress_api_init' );

function revpress_api_list_snippets( \WP_REST_Request $request ) {
    $snippets = get_option( 'revpress_snippets', array( 'version' => '0.0.0', 'snippets' => array() ) );

    return $snippets['snippets'];
}

function revpress_api_permission_check() {
    return current_user_can( 'manage_options' );
}
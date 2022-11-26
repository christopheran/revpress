<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

function revpress_api_init() {
    register_rest_route(
        'revpress/v1',
        'snippets',
        array(
            'methods'               => 'GET',
            'callback'              => 'revpress_api_list_snippets',
            'permission_callback'   => 'revpress_api_permission_check'
        )
    );
}

add_action( 'rest_api_init', 'revpress_api_init' );

function revpress_api_list_snippets( \WP_REST_Request $request ) {
    $list = [
        [
            'id' => 'abc123',
            'name' => 'Snippet one',
            'content' => '<script>console.log("This is the snippet");</script>',
            'categories' => [],
            'tags' => [],
            'is_sitewide' => true,
            'is_all_posts' => false
        ],
        [
            'id' => 'def456',
            'name' => 'Snippet two',
            'content' => '<script>console.log("This is another snippet");</script>',
            'categories' => [],
            'tags' => [],
            'is_sitewide' => false,
            'is_all_posts' => true
        ],
        [
            'id' => 'def456',
            'name' => 'Snippet three',
            'content' => '<script>console.log("This is yet another snippet");</script>',
            'categories' => ['uncategorized'],
            'tags' => ['paywalled'],
            'is_sitewide' => false,
            'is_all_posts' => false
        ],
    ];

    $snippets = get_option( 'revpress_snippets', array( 'version' => '0.0.0', 'snippets' => $list ) );

    return $snippets['snippets'];
}

function revpress_api_permission_check() {
    return current_user_can( 'manage_options' );
}
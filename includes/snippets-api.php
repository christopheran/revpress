<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

/**
 * Returns a unique identifier that can be used for a snippet.
 * 
 * @since 0.1.0
 * 
 * @return string
 */
function revpress_generate_snippet_id() {
    $id = uniqid( 'snip' );

    return apply_filters( 'revpress_generate_snippet_id', $id );
}

/**
 * Get a list of all snippets. Returns an unordered array of snippets keyed by snippet ID.
 * 
 * @since 0.1.0
 * 
 * @return array
 */
function revpress_list_snippets() {
    $snippets = get_option( 'revpress_snippets', array() );

    if ( ! is_array( $snippets ) ) {
        $snippets = array();
    }

    return apply_filters( 'revpress_snippets', $snippets );
}

/**
 * Add or update a snippet.
 * 
 * @since 0.1.0
 * 
 * @param \RevPress\Snippet $snippet
 * 
 * @return null|\WP_error
 */
function revpress_save_snippet( \RevPress\Snippet $snippet ) {
    $snippets = get_option( 'revpress_snippets', array() );

    if ( ! is_array( $snippets ) ) {
        $snippets = array();
    }

    if ( ! $snippet->id ) {
        $snippet->id = revpress_generate_snippet_id();
    }

    $snippets[$snippet->id] = $snippet;

    $saved = update_option( 'revpress_snippets', $snippets );

    if ( ! $saved ) {
        return new WP_Error( 'revpress_save_snippet_failed', __( 'Could not save snippet.', 'revpress' ) );
    }
}
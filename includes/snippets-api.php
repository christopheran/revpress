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
 * Returns a single snippet if found. Returns null if the snippet is not found.
 * 
 * @since 0.1.0
 * 
 * @param string $snippet_id
 * 
 * @return \RevPress\Snippet|null
 */
function revpress_get_snippet( $snippet_id ) {
    $snippets = revpress_list_snippets();

    $matched_snippet = null;
    foreach ( $snippets as $snippet ) {
        if ( $snippet->id === $snippet_id ) {
            $matched_snippet = $snippet;
            break;
        } 
    }

    return apply_filters( 'revpress_get_snippet', $matched_snippet, $snippet_id );
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

    $snippets[$snippet->id] = $snippet;

    $saved = update_option( 'revpress_snippets', $snippets );

    if ( ! $saved ) {
        return new WP_Error( 'update_snippet_option_failed', "Could not update snippet option." );
    }
}

/**
 * Delete a snippet.
 * 
 * @since 0.1.0
 * 
 * @param \RevPress\Snippet $snippet
 * 
 * @return null|\WP_Error
 */
function revpress_delete_snippet( \RevPress\Snippet $snippet ) {
    $snippets = get_option( 'revpress_snippets', array() );

    if ( ! is_array( $snippets ) ) {
        $snippets = array();
    }

    if ( array_key_exists( $snippet->id, $snippets ) ) {
        unset( $snippets[$snippet->id] );
    }

    $saved = update_option( 'revpress_snippets', $snippets );

    if ( ! $saved ) {
        return new WP_Error( 'update_snippet_option_failed', "Could not update snippet option." );
    }
}


/**
 * Check if two snippets are equal to each other.
 * 
 * @since 0.1.0
 * 
 * @param \RevPress\Snippet $snippet_a
 * @param \RevPress\Snippet $snippet_b
 * 
 * @return bool
 */
function revpress_snippets_equal( $snippet_a, $snippet_b ) {
    $equal = (
        $snippet_a->id == $snippet_b->id
        && $snippet_a->enabled == $snippet_b->enabled
        && $snippet_a->content == $snippet_b->content
        && $snippet_a->name == $snippet_b->name
        && revpress_snippet_constraints_equal( $snippet_a->constraints, $snippet_b->constraints )
    );

    return apply_filters( 'revpress_snippets_equal', $equal, $snippet_a, $snippet_b );
}

/**
 * Check if two snippet constraints objects are equal to each other.
 * 
 * @since 0.1.0
 * 
 * @param RevPress\Snippet_Constraints $constraints_a
 * @param RevPress\Snippet_Constraints $constraints_b
 * 
 * @return bool
 */
function revpress_snippet_constraints_equal( $constraints_a, $constraints_b ) {
    $equal = (
        $constraints_a->whole_site == $constraints_b->whole_site
        && $constraints_a->post_types == $constraints_b->post_types
        && $constraints_a->terms == $constraints_b->terms
    );

    return apply_filters( 'revpress_snippet_constraints_equal', $equal, $constraints_a, $constraints_b );
}
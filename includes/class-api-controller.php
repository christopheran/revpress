<?php

namespace RevPress;

use \WP_REST_Controller;
use \WP_REST_Server;
use \WP_REST_Request;
use \WP_REST_Response;
use \WP_Error;

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

class ApiController extends WP_REST_Controller {

    public $namespace = '/revpress/1.0';

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/snippets',
            array(
                array(
                    'methods'             => WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_items' ),
                    'permission_callback' => array( $this, 'get_items_permissions_check' )
                ),
                array(
                    'methods'             => WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_item' ),
                    'permission_callback' => array( $this, 'create_item_permissions_check' )
                )
            )
        );
    }

    public function get_items( $request ) {
        $snippets = revpress_list_snippets();

        $items = array();
        foreach ( $snippets as $snippet ) {
            $item = $this->prepare_item_for_response( $snippet, $request );
            $items[] = $this->prepare_response_for_collection( $item );
        }

        return new WP_REST_Response( $items, 200 );
    }

    public function get_items_permissions_check( $request ) {
        return current_user_can( 'manage_revpress' );
    }

    public function create_item( $request ) {
        if ( $request->has_param( 'id' ) ) {
            return new WP_Error(
                'revpress_snippet_exists',
                __( 'Cannot create existing snippet.', 'revpress' ),
                array( 'status' => 400 )
            );
        }

        $snippet = $this->prepare_item_for_database( $request );

        if ( is_wp_error( $snippet ) ) {
            $snippet->add_data( $snippet->get_error_code(), array( 'status' => 400 ) );
        }

        $result = revpress_save_snippet( $snippet );

        if ( is_wp_error( $result ) ) {
            $snippet->add_data( $snippet->get_error_code(), array( 'status' => 500 ) );
        }

        $data = $this->prepare_item_for_response( $snippet, $request );
        $response = rest_ensure_response( $data );
        $response->set_status( 201 );

        return $response;
    }

    public function create_item_permissions_check( $request ) {
        return current_user_can( 'manage_revpress' );
    }

    public function get_item_schema() {
        if ( $this->schema ) {
            return $this->schema;
        }

        $this->schema = array(
            '$schema'    => 'http://json-schema.org/draft-04/schema#',

            'title'      => 'snippet',
            'type'       => 'object',

            'properties' => array(
                'id'          => array(
                    'type'        => 'string',
                    'description' => "Unique identifier for the snippet.",
                    'readonly'    => true,
                    'format'      => 'snip[a-fA-F0-9]{13}'
                ),
                'enabled'     => array(
                    'type'        => 'boolean',
                    'description' => "Is the snippet enabled or disabled.",
                ),
                'content'     => array(
                    'type'        => 'string',
                    'description' => "The snippet code to be injected into the webpage.",
                ),
                'name'        => array(
                    'type'        => 'string',
                    'description' => "A human-readable label to refer to this snippet."
                ),
                'constraints' => array(
                    'type'        => 'object',
                    'description' => "Contstraints specifying the conditions under which the snippet is injected.",
                    'properties'  => array(
                        'whole_site' => array(
                            'type'        => 'boolean',
                            'description' => "Is the snippet enabled across the whole site?"
                        ),
                        'post_types' => array(
                            'type'        => 'array',
                            'description' => "Post types to constrain the snippet to.",
                            'items'       => array(
                                'type' => 'string'
                            )
                        ),
                        'terms'      => array(
                            'type'        => 'array',
                            'description' => "Term IDs to constrain the snippet to.",
                            'items'       => array(
                                'type' => 'integer'
                            )
                        )
                    )
                )
            )
        );

        return $this->schema;
    }

    /**
     * Prepare a snippet to be returned by the API.
     * 
     * @since 0.1.0
     * 
     * @param \RevPress\Snippet $snippet
     * @param \WP_REST_Request $request
     * 
     * @return array
     */
    public function prepare_item_for_response( $snippet, $request ) {
        $data = array(
            'id'          => $snippet->id,
            'enabled'     => $snippet->enabled,
            'content'     => $snippet->content,
            'name'        => $snippet->name,
            'constraints' => array(
                'whole_site' => $snippet->constraints->whole_site,
                'post_types' => $snippet->constraints->post_types,
                'terms'      => $snippet->constraints->terms
            )
        );

        return rest_ensure_response( $data );
    }

    public function prepare_item_for_database( $request ) {
        $snippet = new Snippet();
        $snippet->version = 1;

        $content = $request->get_param( 'content' );
        $name = $request->get_param( 'name' );
        $enabled = ( $request->has_param( 'enabled' ) && $request->get_param( 'enabled' ) == '1' );

        if ( empty( $content ) ) {
            return new WP_Error(
                'missing_content',
                __( "Snippet content is required.", 'revpress' )
            );
        }

        if ( empty( $name ) ) {
            $name = '';
        }

        $snippet->content = $content;
        $snippet->name = $name;
        $snippet->enabled = $enabled;

        return $snippet;
    }

}
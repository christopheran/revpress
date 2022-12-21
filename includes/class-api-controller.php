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

    public $namespace = 'revpress/1.0';

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

        register_rest_route(
            $this->namespace,
            '/snippets/(?P<id>snip[a-fA-F0-9]{13})',
            array(
                array(
                    'methods'             => WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_item' ),
                    'permission_callback' => array( $this, 'update_item_permissions_check' )
                ),
                array(
                    'methods'             => WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_item' ),
                    'permission_callback' => array( $this, 'delete_item_permissions_check' )
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
                'snippet_exists',
                "Cannot create existing snippet.",
                array( 'status' => 400 )
            );
        }

        $snippet = $this->prepare_item_for_database( $request );

        if ( is_wp_error( $snippet ) ) {
            // The request sent to the API is in some way invalid.
            return new WP_REST_Response( $snippet->get_error_data(), 400 );
        }

        $snippet->id = revpress_generate_snippet_id();

        $result = revpress_save_snippet( $snippet );

        if ( is_wp_error( $result ) ) {
            /*
            The snippet could not be saved for some reason.
            This is a server error.
            */
            return new WP_Error(
                'create_item_failed',
                "Snippet could not be created.",
                array( 'status' => 500 )
            );
        }

        $data = $this->prepare_item_for_response( $snippet, $request );
        $response = rest_ensure_response( $data );
        $response->set_status( 201 );

        return $response;
    }

    public function create_item_permissions_check( $request ) {
        return current_user_can( 'manage_revpress' );
    }

    public function update_item( $request ) {
        $snippet_id = $request->get_param( 'id' );

        if ( empty( $snippet_id ) ) {
            return new WP_Error(
                'invalid_uri_parameter',
                "Path must contain snippet ID.",
                array(
                    'status'    => 400,
                    'parameter' => 'id',
                    'error'     => 'required_parameter_empty'
                )
            );
        }

        $old_snippet = revpress_get_snippet( $snippet_id );

        if ( ! $old_snippet ) {
            return new WP_Error(
                'item_not_found',
                "Could not find snippet matching provided snippet ID.",
                array( 'status' => 404 )
            );
        }

        $new_snippet = $this->prepare_item_for_database( $request );

        if ( is_wp_error( $new_snippet ) ) {
            return new WP_REST_Response( $new_snippet->get_error_data(), 400 );
        }

        $new_snippet->id = $old_snippet->id;

        $result = revpress_save_snippet( $new_snippet );

        if ( is_wp_error( $result ) ) {
            return new WP_Error(
                'update_item_failed',
                "Snippet could not be updated.",
                array( 'status' => 500 )
            );
        }

        $data = $this->prepare_item_for_response( $new_snippet, $request );
        $response = rest_ensure_response( $data );
        $response->set_status( 200 );

        return $response;
    }

    public function update_item_permissions_check( $request ) {
        return current_user_can( 'manage_revpress' );
    }

    public function delete_item( $request ) {
        $snippet_id = $request->get_param( 'id' );

        if ( empty( $snippet_id ) ) {
            return new WP_Error(
                'invalid_uri_parameter',
                "Path must contain snippet ID.",
                array(
                    'status'    => 400,
                    'parameter' => 'id',
                    'error'     => 'required_parameter_empty'
                )
            );
        }

        $snippet = revpress_get_snippet( $snippet_id );

        if ( ! $snippet ) {
            return new WP_Error(
                'item_not_found',
                "Could not find snippet matching provided snippet ID.",
                array( 'status' => 404 )
            );
        }

        $result = revpress_delete_snippet( $snippet );

        if ( is_wp_error( $result ) ) {
            return new WP_Error(
                'delete_snippet_failed',
                "Snippet could not be deleted.",
                array( 'status' => 500 )
            );
        }

        $item = $this->prepare_item_for_response( $snippet, $request );

        return new WP_REST_Response( $item, 200 );
    }

    public function delete_item_permissions_check( $request ) {
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

        $content = $request->get_param( 'content' );
        $name = $request->get_param( 'name' );
        $enabled = ( $request->has_param( 'enabled' ) && $request->get_param( 'enabled' ) == '1' );

        if ( empty( $content ) ) {
            return new WP_Error(
                'invalid_field',
                "Snippet content is required.",
                array(
                    'field' => 'content',
                    'error' => 'required_field_empty'
                )
            );
        }

        if ( empty( $name ) ) {
            $name = '';
        }

        $snippet->content = $content;
        $snippet->name = $name;
        $snippet->enabled = $enabled;

        $snippet->constraints = new Snippet_Constraints();

        return $snippet;
    }

}
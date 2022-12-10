<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

function revpress_api_init() {
    $api = new \RevPress\ApiController();
    $api->register_routes();
}

add_action( 'rest_api_init', 'revpress_api_init' );
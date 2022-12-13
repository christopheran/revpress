<?php

namespace RevPress;

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

class Snippet_Constraints {

    public $whole_site = false;

    public $post_types = [];

    public $terms = [];

}
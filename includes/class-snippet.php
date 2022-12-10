<?php

namespace RevPress;

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

class Snippet {

    public $version;

    public $id;

    public $enabled;

    public $content;

    public $name;

    /**
     * @var \RevPress\Snippet_Constraints
     */
    public $constraints;

    public function __serialize() {
        return array(
            $this->version,
            $this->id,
            $this->enabled,
            base64_encode( $this->content ),
            $this->name
        );
    }

    public function __unserialize( $data ) {
        $this->version = $data[0];
        $this->id = $data[1];
        $this->enabled = $data[2];
        $this->content = base64_decode( $data[3] );
        $this->name = $data[4];
    }

}
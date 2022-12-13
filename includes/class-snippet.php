<?php

namespace RevPress;

if ( ! defined( 'ABSPATH' ) ) {
    exit();
}

class Snippet {

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
            'id'          => $this->id,
            'enabled'     => $this->enabled,
            'content'     => base64_encode( $this->content ),
            'name'        => $this->name,
            'constraints' => serialize( $this->constraints )
        );
    }

    public function __unserialize( $data ) {
        $this->id = $data['id'];
        $this->enabled = $data['enabled'];
        $this->content = base64_decode( $data['content'] );
        $this->name = $data['name'];
        $this->constraints = unserialize( $data['constraints'] );
    }

}
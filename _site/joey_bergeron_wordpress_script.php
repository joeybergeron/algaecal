<?php
<!-- Making jQuery Google API -->
function modify_jquery() {
    wp_deregister_script('jquery');
    wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', false, '3.2.1');
    wp_enqueue_script('jquery');
}
add_action('admin_enqueue_scripts', 'modify_jquery');

<!-- Plugins are possible too. jQuery Updater or Google Libraries. -->
?>

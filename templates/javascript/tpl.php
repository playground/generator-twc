<?php
/**
 * Placeholder / Example tpl, outputting the variables passed via ESI.
 */
?><%= name %> TPL
<p>
    <?php
    // Specified by the context twclocation.
    if(isset($location_id) && isset($location)) {
        echo $location_id . ' ' . $location['cityNm'];
    }
    ?>
</p>
<p>
    <?php
    // Current wxnode forecast field name is twclocation.
    if(isset($twclocation)) {
        echo $twclocation;
    }
    ?>
</p>



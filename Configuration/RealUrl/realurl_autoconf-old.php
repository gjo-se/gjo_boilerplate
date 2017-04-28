<?php
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array(
    'winpremium.msm-apps.de' => array(
//        'cache'         => array(
//            'disable' => true
//        ),
        'init'     => array(
            'appendMissingSlash'  => 'ifNotFile,redirect',
            'emptyUrlReturnValue' => '/',
        ),
        'pagePath' => array(
            'rootpage_id' => '1',
        ),
        'fileName' => array(
            'defaultToHTMLsuffixOnPrev' => 0,
            'acceptHTMLsuffix'          => 1,
            'index'                     => array(
                'print' => array(
                    'keyValues' => array(
                        'type' => 98,
                    ),
                ),
            ),
        ),
    ),
//    'dev.msm-mediamarkt.at' => 'winpremium.msm-apps.de',
);

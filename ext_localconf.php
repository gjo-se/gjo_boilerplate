<?php
defined('TYPO3_MODE') or die();

call_user_func(function () {
    if (TYPO3_MODE === 'BE') {
    }

    if (TYPO3_MODE === 'FE') {
    }

    // Register "gjo:" namespace
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['fluid']['namespaces']['gjoSe'][] = 'GjoSe\GjoBoilerplate\ViewHelpers';
});

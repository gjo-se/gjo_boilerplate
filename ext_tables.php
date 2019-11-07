<?php
if (!defined ('TYPO3_MODE')) die ('Access denied.');

//TODO: der sollte hier nicht mehr stehen - in Bootstrappakage schauen, wie jetzt eingebunden => Lösung siehe
// typo3conf/ext/gjo_introduction/Configuration/TCA/Overrides/sys_template.php

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Gjo Boilerplate');
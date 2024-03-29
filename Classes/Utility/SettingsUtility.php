<?php
/***************************************************************
 *  created: 23.01.18 - 15:49
 *  Copyright notice
 *  (c) 2017 Gregory Jo Erdmann <gregory.jo@gjo-se.com>
 *  All rights reserved
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

namespace GjoSe\GjoBoilerplate\Utility;

use TYPO3\CMS\Frontend\Controller\TypoScriptFrontendController;
use TYPO3\CMS\Frontend\Authentication\FrontendUserAuthentication;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManagerInterface;


class SettingsUtility extends AbstractUtility
{

    /**
     * @var array
     */
    protected $settings;

    public function __construct()
    {
        $this->objectManager = GeneralUtility::makeInstance('TYPO3\CMS\Extbase\Object\ObjectManager');
        $this->configurationManager = $this->objectManager->get('TYPO3\CMS\Extbase\Configuration\ConfigurationManagerInterface');
    }

    public function getSettings($type = '', $extension = null, $plugin = null)
    {
        switch ($type) {
            case ('framework'):
                $type = ConfigurationManagerInterface::CONFIGURATION_TYPE_FRAMEWORK;
                break;
            case ('full'):
                $type = ConfigurationManagerInterface::CONFIGURATION_TYPE_FULL_TYPOSCRIPT;
                break;
            case ('extension'):
                $type = ConfigurationManagerInterface::CONFIGURATION_TYPE_SETTINGS;
                break;
            default:
                $type = ConfigurationManagerInterface::CONFIGURATION_TYPE_SETTINGS;
        }

        return $this->configurationManager->getConfiguration($type, $extension, $plugin);
    }

}
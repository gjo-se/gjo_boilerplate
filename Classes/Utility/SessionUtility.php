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

class SessionUtility
{

    /**
     * @var array
     */
    protected $sessionData = array();

    /**
     * @var string
     */
    protected $sessionPrefix = '';

    /**
     * @var TypoScriptFrontendController
     */
    protected $frontendController;

    public function __construct()
    {
        $this->frontendController = $GLOBALS['TSFE'];
    }

    /**
     * @return void
     */
    public function initSession($sessionPrefix = '')
    {
        $this->setSessionPrefix($sessionPrefix);

        if ($this->frontendController->loginUser) {
            $this->sessionData = $this->frontendController->fe_user->getKey('user', $this->sessionPrefix);
        } else {
            $this->sessionData = $this->frontendController->fe_user->getKey('ses', $this->sessionPrefix);
        }
    }

    /**
     * @return void
     */
    public function storeSession()
    {
        if ($this->frontendController->loginUser) {
            $this->frontendController->fe_user->setKey('user', $this->sessionPrefix, $this->getSessionData());
        } else {
            $this->frontendController->fe_user->setKey('ses', $this->sessionPrefix, $this->getSessionData());
        }
        $this->frontendController->storeSessionData();
    }

    /**
     * @return void
     */
    public function destroySession()
    {
        if ($this->frontendController->loginUser) {
            $this->frontendController->fe_user->setKey('user', $this->sessionPrefix, null);
        } else {
            $this->frontendController->fe_user->setKey('ses', $this->sessionPrefix, null);
        }
        $this->frontendController->storeSessionData();
    }

    /**
     * @param string $key
     * @param string $value
     *
     * @return void
     */
    public function setSessionData($key, $value)
    {
        $this->sessionData[$key] = $value;
        $this->storeSession();
    }

    /**
     * Retrieve a member of the $sessionData variable
     *
     * If no $key is passed, returns the entire $sessionData array
     *
     * @param string $key     Parameter to search for
     * @param mixed  $default Default value to use if key not found
     *
     * @return mixed Returns NULL if key does not exist
     */
    public function getSessionData($key = null, $default = null)
    {
        if ($key === null) {
            return $this->sessionData;
        }

        return isset($this->sessionData[$key]) ? $this->sessionData[$key] : $default;
    }

    /**
     * Set the s prefix
     *
     * @param string $sessionPrefix
     *
     */
    public function setSessionPrefix($sessionPrefix)
    {
        $this->sessionPrefix = $sessionPrefix;
    }

    /**
     * @param string $key
     *
     * @return bool
     */
    public function hasSessionKey($key)
    {
        return isset($this->sessionData[$key]);
    }
}
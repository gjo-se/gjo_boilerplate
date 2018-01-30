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

class SessionUtility
{
    const NOT_LOGGED_IN_FE_USER_SESSION_ID = 'notLoggedInFeUserSessionId';

    /**
     * @var \TYPO3\CMS\Frontend\Controller\TypoScriptFrontendController
     */
    protected $frontendController = null;

    /**
     * @var null | \TYPO3\CMS\Frontend\Authentication\FrontendUserAuthentication
     */
    protected $feUser = null;

    /**
     * @var string
     */
    protected $sessionPrefix = '';

    /**
     * @var array
     */
    protected $sessionData = array();

    /**
     * @var string
     */
    protected $notLoggedInFeUserSessionId = '';

    /**
     * @var int
     */
    protected $loggedInFeUserUid = 0;

    /**
     * @return TypoScriptFrontendController
     */
    public function getFrontendController()
    {
        if(!$this->frontendController){
            $this->setFrontendController($GLOBALS['TSFE']);
        }
        return $this->frontendController;
    }

    /**
     * @param TypoScriptFrontendController $frontendController
     *
     * @return void
     */
    public function setFrontendController(TypoScriptFrontendController $frontendController)
    {
        $this->frontendController = $frontendController;
    }

    /**
     * @return null | FrontendUserAuthentication
     */
    public function getFeUser()
    {
        if (!$this->feUser) {
            $this->setFeUser($this->getFrontendController()->fe_user);
        }

        return $this->feUser;
    }

    /**
     * @param FrontendUserAuthentication $feUser
     *
     * @return void
     */
    public function setFeUser(FrontendUserAuthentication $feUser)
    {
        $this->feUser = $feUser;
    }

    /**
     * @return string
     */
    public function getSessionPrefix()
    {
        return $this->sessionPrefix;
    }

    /**
     * @param string $sessionPrefix
     *
     */
    public function setSessionPrefix($sessionPrefix)
    {
        $this->sessionPrefix = $sessionPrefix;
    }

    /**
     * Retrieve a member of the $sessionData variable
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
     * @return string
     */
    public function getNotLoggedInFeUserSessionId()
    {
        if(!$this->notLoggedInFeUserSessionId){
            $notLoggedInFeUserSessionData = $this->frontendController->fe_user->getKey('ses', $this->sessionPrefix);
            $this->setNotLoggedInFeUserSessionId($notLoggedInFeUserSessionData[self::NOT_LOGGED_IN_FE_USER_SESSION_ID]);
        }

        return $this->notLoggedInFeUserSessionId;
    }

    /**
     * @param string $notLoggedInFeUserSessionId
     *
     * @return void
     */
    public function setNotLoggedInFeUserSessionId($notLoggedInFeUserSessionId)
    {
        $this->notLoggedInFeUserSessionId = $notLoggedInFeUserSessionId;
    }

    /**
     * @return void
     */
    public function initSession()
    {
        if ($this->getFrontendController()->loginUser) {
            $this->sessionData = $this->frontendController->fe_user->getKey('user', $this->sessionPrefix);
        } else {
            $this->sessionData = $this->frontendController->fe_user->getKey('ses', $this->sessionPrefix);
        }

        if(!$this->getSessionData(self::NOT_LOGGED_IN_FE_USER_SESSION_ID)){
            $this->setSessionData(self::NOT_LOGGED_IN_FE_USER_SESSION_ID, $this->getFeUser()->id);
        }
    }

    /**
     * @return integer
     */
    public function getLoggedInFeUserUid()
    {
        if(!$this->loggedInFeUserUid){
            $this->setLoggedInFeUserUid($this->getFeUser()->user['uid']);
        }

        return $this->loggedInFeUserUid;
    }

    /**
     * @param integer $loggedInFeUserUid
     *
     * @return void
     */
    public function setLoggedInFeUserUid($loggedInFeUserUid)
    {
        $this->loggedInFeUserUid = $loggedInFeUserUid;
    }

    /**
     * @return void
     */
    public function storeSession()
    {
        if ($this->getFrontendController()->loginUser) {
            $this->getFeUser()->setKey('user', $this->getSessionPrefix(), $this->getSessionData());
        } else {
            $this->getFeUser()->setKey('ses', $this->getSessionPrefix(), $this->getSessionData());
        }
        $this->getFrontendController()->storeSessionData();
    }

    /**
     * @return void
     */
    public function destroySession()
    {
        if ($this->getFrontendController()->loginUser) {
            $this->getFeUser()->setKey('user', $this->getSessionPrefix(), null);
        } else {
            $this->getFeUser()->setKey('ses', $this->getSessionPrefix(), null);
        }
        $this->getFrontendController()->storeSessionData();
    }

    /**
     * @param string $key
     *
     * @return bool
     */
    public function hasSessionKey($key)
    {
        return isset($this->getSessionData()[$key]);
    }

}
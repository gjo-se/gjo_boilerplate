<?php

namespace GjoSe\GjoBoilerplate\Controller;

/***************************************************************
 *  created: 26.09.16 - 12:05
 *  Copyright notice
 *  (c) 2016 Gregory Jo Erdmann <gregory.jo@gjo-se.com>
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

use TYPO3\CMS\Extbase\Mvc\Controller\ActionController as CoreAbstractController;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use GjoSe\GjoBoilerplate\Utility\SessionUtility;
use TYPO3\CMS\Extbase\Persistence\Generic\PersistenceManager;

use TYPO3\CMS\Extbase\Configuration\ConfigurationManagerInterface;
use GjoSe\GjoBoilerplate\Service\SendMailService;

class AbstractController extends CoreAbstractController
{
    /**
     * @var \TYPO3\CMS\Extbase\Persistence\Generic\PersistenceManager
     */
    protected $persistenceManager;

    /**
     * @var \GjoSe\GjoBoilerplate\Utility\SessionUtility
     */
    protected $sessionUtility;

    /**
     * @var string
     */
    protected $extensionKey = '';

    /**
     * @var \GjoSe\GjoBoilerplate\Service\SendMailService
     */
    protected $sendMailService = null;

    /**
     * @param \TYPO3\CMS\Extbase\Persistence\Generic\PersistenceManager $persistenceManager
     *
     * @return void
     */
    public function injectPersistenceManager(PersistenceManager $persistenceManager)
    {
        $this->persistenceManager = $persistenceManager;
    }

    /**
     * @return \GjoSe\GjoBoilerplate\Utility\SessionUtility
     */
    public function getSessionUtility()
    {
        if (!$this->sessionUtility) {
            $this->setSessionUtility($this->objectManager->get('GjoSe\GjoBoilerplate\Utility\SessionUtility'));
        }

        return $this->sessionUtility;
    }

    /**
     * @param \GjoSe\GjoBoilerplate\Utility\SessionUtility $sessionUtility
     *
     * @return void
     */
    public function setSessionUtility(SessionUtility $sessionUtility)
    {
        $this->sessionUtility = $sessionUtility;
    }

    /**
     * @return string
     */
    public function getExtensionKey()
    {
        if(!$this->extensionKey){
            $this->setExtensionKey(GeneralUtility::camelCaseToLowerCaseUnderscored($this->extensionName));
        }

        return $this->extensionKey;
    }

    /**
     * @param string $extensionKey
     *
     * @return void
     */
    public function setExtensionKey($extensionKey)
    {
        $this->extensionKey = $extensionKey;
    }

    /**
     * @param \GjoSe\GjoBoilerplate\Service\SendMailService
     */
    public function injectSendMailService(SendMailService $sendMailService)
    {
        $this->sendMailService = $sendMailService;
    }

    /**
     * @return void
     */
    public function redirectToPage($pid)
    {
        $uriBuilder = $this->uriBuilder;
        $uri        = $uriBuilder
            ->setTargetPageUid($pid)
            ->build();
        $this->redirectToUri($uri);
    }

}
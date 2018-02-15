<?php

namespace GjoSe\GjoBoilerplate\Service;

/***************************************************************
 *  created: 08.02.18 - 15:49
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

use TYPO3\CMS\Core\Service\AbstractService as CoreAbstractService;
use TYPO3\CMS\Extbase\Object\ObjectManagerInterface;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContext;

abstract class AbstractService extends CoreAbstractService
{
    /**
     * @var \TYPO3\CMS\Extbase\Object\ObjectManagerInterface
     */
    protected $objectManager;

    //TODO: nochmal anschauen - geht so nicht
//    /**
//     * Controller Context to use
//     *
//     * @var \TYPO3\CMS\Extbase\Mvc\Controller\ControllerContext
//     * @api
//     */
//    protected $controllerContext;

    /**
     * @param \TYPO3\CMS\Extbase\Object\ObjectManagerInterface $objectManager
     */
    public function injectObjectManager(ObjectManagerInterface $objectManager)
    {
        $this->objectManager = $objectManager;
    }

//    public function getControllerContext()
//    {
//        $renderingContext = $this->objectManager->get(RenderingContext::class);
//
//        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($renderingContext, 'rC');
//        exit;
//        //        parent::setRenderingContext($renderingContext);
//        if ($renderingContext instanceof \TYPO3\CMS\Fluid\Core\Rendering\RenderingContext) {
//            $this->controllerContext = $renderingContext->getControllerContext();
//        }
//    }

}
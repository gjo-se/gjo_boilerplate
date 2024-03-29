<?php

namespace GjoSe\GjoBoilerplate\Utility;

/***************************************************************
 *  created: 19.02.18 - 16:37
 *  Copyright notice
 *  (c) 2018 Gregory Jo Erdmann <gregory.jo@gjo-se.com>
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

use TYPO3\CMS\Extbase\Object\ObjectManager;
use TYPO3\CMS\Extbase\Service\ImageService;

/**
 * Class AbstractRepository
 * @package GjoSe\GjoBoilerplate\Domain\Repository
 */
abstract class AbstractUtility
{
    /**
     * @var \TYPO3\CMS\Extbase\Object\ObjectManager
     */
    protected $objectManager;

    /**
     * @var \TYPO3\CMS\Extbase\Configuration\ConfigurationManager
     */
    protected $configurationManager;


    /**
     * @var \TYPO3\CMS\Extbase\Service\ImageService
     */
    protected $imageService;

    /**
     * @param \TYPO3\CMS\Extbase\Object\ObjectManager
     */
    public function injectObjectManager(ObjectManager $objectManager)
    {
        $this->objectManager = $objectManager;
    }

    /**
     * @param \TYPO3\CMS\Extbase\Service\ImageService
     */
    public function injectImageService(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }


}
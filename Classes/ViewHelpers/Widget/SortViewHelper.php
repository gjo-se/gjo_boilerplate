<?php
namespace GjoSe\GjoBoilerplate\ViewHelpers\Widget;

/***************************************************************
 *  created: 22.02.17 - 08:21
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

use TYPO3\CMS\Extbase\Persistence\QueryResultInterface;

/**
 * Class SortViewHelper
 * @package GjoSe\GjoBoilerplate\ViewHelpers\Widget
 */
class SortViewHelper extends AbstractWidgetViewHelper
{

    /**
     * @var \GjoSe\GjoBoilerplate\ViewHelpers\Widget\Controller\SortController
     * @inject
     */
    protected $controller;

    /**
     * @param \TYPO3\CMS\Extbase\Persistence\QueryResultInterface $objects
     * @param string                                              $as
     *
     * @return string
     */
    public function render(QueryResultInterface $objects, $as)
    {
        return $this->initiateSubRequest();
    }
}
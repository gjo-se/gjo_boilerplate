<?php
namespace GjoSe\GjoBoilerplate\ViewHelpers\Widget\Controller;

/***************************************************************
 *  created: 16.06.17 - 07:51
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

use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Class AutocompleteController
 * @package GjoSe\GjoBoilerplate\ViewHelpers\Widget\Controller
 */
class AutocompleteController extends AbstractWidgetController
{
    /**
     * @return void
     */
    public function indexAction()
    {
        if ($this->widgetConfiguration['extensionName'] === null) {
            $extensionName = GeneralUtility::camelCaseToLowerCaseUnderscored($this->request->getControllerExtensionName());

        }else{
            $extensionName = $this->widgetConfiguration['extensionName'];
        }

        $this->view->assignMultiple(array(
                'class' => $this->widgetConfiguration['class'],
                'name' => $this->widgetConfiguration['name'],
                'id' => $this->widgetConfiguration['id'],
                'placeholder' => $this->widgetConfiguration['placeholder'],
                'extensionName' => $extensionName,
                'suggestionLink' => $this->widgetConfiguration['suggestionLink'],
                'config' => $this->widgetConfiguration['config'],
                'datasets' => $this->widgetConfiguration['datasets'],
                'tagsManager' => $this->widgetConfiguration['tagsManager']
            )
        );
    }
}

<?php
namespace GjoSe\GjoBoilerplate\ViewHelpers\Widget;

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

use GjoSe\GjoBoilerplate\ViewHelpers\Widget\Controller\AutocompleteController;
use TYPO3\CMS\Extbase\Persistence\Generic\QueryResult;

/**
 * Class AutocompleteViewHelper
 * @package GjoSe\GjoBoilerplate\ViewHelpers\Widget
 */
class AutocompleteViewHelper extends AbstractWidgetViewHelper
{

    /**
     * @var \GjoSe\GjoBoilerplate\ViewHelpers\Widget\Controller\AutocompleteController
     */
    protected $controller;

    /**
     * @var bool
     */
    protected $ajaxWidget = true;

    /**
     * @param \GjoSe\GjoBoilerplate\ViewHelpers\Widget\Controller\AutocompleteController $controller
     */
    public function injectAutocompleteController(AutocompleteController $controller)
    {
        $this->controller = $controller;
    }

    /**
     * @return void
     */
    public function initializeArguments()
    {
        $this->registerArgument('class', 'string', 'CSS class(es) for this element');
        $this->registerArgument('name', 'string', 'Tag Name', FALSE);
        $this->registerArgument('id', 'string', 'Unique (in this file) identifier for this HTML element.', TRUE);
        $this->registerArgument('placeholder', 'string', 'Placeholder for the Input-Tag.');
        $this->registerArgument('title', 'string', 'Tooltip text of element');
        $this->registerArgument('accesskey', 'string', 'Keyboard shortcut to access this element');
        $this->registerArgument('tabindex', 'integer', 'Specifies the tab order of this element');

        $this->registerArgument('extensionName', 'string', 'ExtensionName, If NULL the current extension name is used', FALSE);
        $this->registerArgument('suggestionLink', 'boolean', 'Link for suggestion, If False selects the Element', FALSE, FALSE);
        $this->registerArgument('config', 'array', 'typeahead-config', FALSE);
        $this->registerArgument('datasets', 'array', 'Prefetch-Configuration', FALSE);
        $this->registerArgument('tagsManager', 'array', 'tagsManager-Configuration', FALSE);
    }

    /**
     * @return \TYPO3\CMS\Extbase\Mvc\ResponseInterface
     */
    public function render()
    {
        return $this->initiateSubRequest();
    }
}
<?php
namespace GjoSe\GjoBoilerplate\Validation\Validator;

/***************************************************************
 *  created: 23.03.18 - 18:57
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

use TYPO3\CMS\Extbase\Validation\Validator\AbstractValidator as CoreAbstractValidator;

abstract class AbstractValidator extends CoreAbstractValidator
{
    protected $translationFile =  'EXT:gjo_boilerplate/Resources/Private/Language/form.xlf:';
    /**
     * Wrap static call to LocalizationUtility to simplify unit testing
     *
     * @param string $translateKey
     * @param string $extensionName
     * @param array $arguments
     *
     * @return NULL|string
     */
    protected function translateErrorMessage($translateKey, $extensionName = null, $arguments = [])
    {
        return \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate(
            $translateKey,
            $extensionName,
            $arguments
        );
    }

}
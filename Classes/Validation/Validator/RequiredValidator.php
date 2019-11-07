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

class RequiredValidator extends AbstractValidator
{
    /**

     * @var bool
     */
    protected $acceptsEmptyValues = false;

    /**
     * Checks if the given property ($propertyValue) is not empty (NULL, empty string, empty array or empty object).
     *
     * @param mixed $value The value that should be validated
     */
    public function isValid($value)
    {
        if ($value === null) {
            $this->addError(
                $this->translateErrorMessage(
                    'LLL:' . $this->translationFile . 'validator.required.error'
                ), 1221560910);
        }
        if ($value === '') {
            $this->addError(
                $this->translateErrorMessage(
                    'LLL:' . $this->translationFile . 'validator.required.error'
                ), 1221560999);
        }
        if (is_array($value) && empty($value)) {
            $this->addError(
                $this->translateErrorMessage(
                    'LLL:' . $this->translationFile . 'validator.required.error'
                ), 1347992400);
        }
        if (is_object($value) && $value instanceof \Countable && $value->count() === 0) {
            $this->addError(
                $this->translateErrorMessage(
                    'LLL:' . $this->translationFile . 'validator.required.error'
                ), 1347992453);
        }
    }
}

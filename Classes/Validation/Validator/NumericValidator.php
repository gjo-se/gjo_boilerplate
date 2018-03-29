<?php
namespace GjoSe\GjoBoilerplate\Validation\Validator;

/***************************************************************
 *  created: 29.03.18 - 11:09
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

class NumericValidator extends AbstractValidator
{
    const REGEX = '/^-?\d+([,.])?\d*$/';

    /**
     * Checks if the given value is a valid number.
     * plus / minus
     * 1 Komma or point es Dezimalseprator
     * no thausend.point
     *
     * @param mixed $value The value that should be validated
     */
    public function isValid($value)
    {
        if (!preg_match(self::REGEX, $value)) {
            $this->addError(
            $this->translateErrorMessage(
                'LLL:' . $this->translationFile . 'validator.numeric.error'
            ), 1221563685);
        }
    }
}

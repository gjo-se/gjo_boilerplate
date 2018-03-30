<?php
namespace GjoSe\GjoBoilerplate\Validation\Validator;

/***************************************************************
 *  created: 30.03.18 - 05:57
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

class NumericRangeValidator extends AbstractValidator
{
    /**
     * @var array
     */
    protected $supportedOptions = [
        'min' => [0, 'The minimum value to accept', 'integer'],
        'max' => [PHP_INT_MAX, 'The maximum value to accept', 'integer']
    ];

    /**
     * The given value is valid if it is a number in the specified range.
     *
     * @param mixed $value The value that should be validated
     * @api
     */
    public function isValid($value)
    {
        if (!is_numeric($value)) {
            $this->addError(
                $this->translateErrorMessage(
                    'LLL:' . $this->translationFile . 'validator.numericRange.error.notvalid'
                ), 1221563685);
            return;
        }

        $minimum = $this->options['min'];
        $maximum = $this->options['max'];

        if ($minimum > $maximum) {
            $x = $minimum;
            $minimum = $maximum;
            $maximum = $x;
        }
        if ($value < $minimum || $value > $maximum) {
            $this->addError($this->translateErrorMessage(
                'LLL:' . $this->translationFile . 'validator.numericRange.error.range',
                null,
                [
                    $minimum,
                    $maximum
                ]
            ), 1221561046, [$minimum, $maximum]);
        }
    }
}

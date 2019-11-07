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

class stringLengthValidator extends AbstractValidator
{
    /**
     * @var array
     */
    protected $supportedOptions = [
        'min' => [0, 'min length for a valid string', 'integer'],
        'max' => [PHP_INT_MAX, 'max length for a valid string', 'integer']
    ];

    /**
     * Checks if the given value is a valid string (or can be cast to a string
     * if an object is given) and its length is between min and max
     * specified in the validation options.
     * Usage: @validate GjoSe.GjoBoilerplate:StringLength(max=500)
     *
     * @param mixed $value The value that should be validated
     * @throws \TYPO3\CMS\Extbase\Validation\Exception\InvalidValidationOptionsException
     */
    public function isValid($value)
    {
        if ($this->options['max'] < $this->options['min']) {
            throw new \TYPO3\CMS\Extbase\Validation\Exception\InvalidValidationOptionsException('The \'max\' is shorter than the \'min\' in the StringLengthValidator.', 1238107096);
        }

        if (is_object($value)) {
            if (!method_exists($value, '__toString')) {
                $this->addError('The given object could not be converted to a string.', 1238110957);
                return;
            }
        } elseif (!is_string($value)) {
            $this->addError('The given value was not a valid string.', 1269883975);
            return;
        }

        $stringLength = mb_strlen($value, 'utf-8');
        $isValid = true;
        if ($stringLength < $this->options['min']) {
            $isValid = false;
        }
        if ($stringLength > $this->options['max']) {
            $isValid = false;
        }

        if ($isValid === false) {
            if ($this->options['min'] > 0 && $this->options['max'] < PHP_INT_MAX) {
                $this->addError(
                    $this->translateErrorMessage(
                        'LLL:' . $this->translationFile . 'validator.stringLength.error.between',
                        null,
                        [
                            $this->options['min'],
                            $this->options['max']
                        ]
                    ), 1428504122, [$this->options['min'], $this->options['max']]);
            } elseif ($this->options['min'] > 0) {
                $this->addError(
                    $this->translateErrorMessage(
                        'LLL:' . $this->translationFile . 'validator.stringLength.error.min',
                        null,
                        [
                            $this->options['min']
                        ]
                    ), 1238108068, [$this->options['min']]);
            } else {
                $this->addError(
                    $this->translateErrorMessage(
                        'LLL:' . $this->translationFile . 'validator.stringLength.error.max',
                        null,
                        [
                            $this->options['max']
                        ]
                    ), 1238108069, [$this->options['max']]);
            }
        }
    }
}

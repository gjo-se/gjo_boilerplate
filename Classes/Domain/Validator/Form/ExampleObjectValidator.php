<?php

namespace GjoSe\GjoExtendsFemanager\Domain\Validator\Form;

/***************************************************************
 *  created: 30.03.18 - 07:10
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

use GjoSe\GjoBoilerplate\Validation\Validator\AbstractValidator;

class ExampleObjectValidator extends AbstractValidator
{

    /**
     * ExampleObjectValidator Validates the correspond Object.
     * Must be in teh same Ext like the Model.
     *
     * @param mixed $object
     *
     * @return boolean
     */
    protected function isValid($validTestForm)
    {
        if ($validTestForm->getValidtest() != $validTestForm->getRequired()) {
            $this->result->forProperty('property1')
                         ->addError(
                             new \TYPO3\CMS\Extbase\Error\Error(
                                 $this->translateErrorMessage(
                                     'LLL:' . $this->translationFile . 'validator.validTestForm.error.compare'
                                 ),
                                 1522387963));

            $this->result->forProperty('property2')
                         ->addError(
                             new \TYPO3\CMS\Extbase\Error\Error(
                                 $this->translateErrorMessage(
                                     'LLL:' . $this->translationFile . 'validator.validTestForm.error.compare'
                                 ),
                                 1522387963));
            return false;

        } else {

            return true;
        }
    }

}

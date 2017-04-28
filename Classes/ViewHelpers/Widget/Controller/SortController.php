<?php
namespace Gjo\GjoBoilerplate\ViewHelpers\Widget\Controller;

/***************************************************************
 *  created: 26.09.16 - 12:05
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

use TYPO3\CMS\Extbase\Persistence\QueryInterface;

/**
 * Class SortController
 * @package Gjo\GjoBoilerplate\ViewHelpers\Widget\Controller
 */
class SortController extends AbstractWidgetController
{

    /**
     * @param string $order
     */
    public function indexAction($order = QueryInterface::ORDER_DESCENDING)
    {
        $objects = $this->objects;

        if ($objects->count()) {
            foreach ($objects as $key => $object) {
                $objectsArray[$object->getUid()] = $object;
            }
        }

        $property = '';
        if($this->request->hasArgument('property')){
            $property = $this->request->getArgument('property');
        }

        $this->sort($objectsArray, $property, $order);

        $this->view->assign('contentArguments', array(
            $this->widgetConfiguration['as'] => $objectsArray
        ));
        $this->view->assign('order', $order);
    }

    protected function sort(&$arrayToSort, $propertiesString, $order)
    {

        usort($arrayToSort, function ($a, $b) use ($propertiesString, $order) {

            if($propertiesString == 'customerProductName'){

                $aCustomerProductName = $a->getCustomerProductName();
                $bCustomerProductName = $b->getCustomerProductName();

                if ($aCustomerProductName == $bCustomerProductName) {
                    return 0;
                }

                if ($order == QueryInterface::ORDER_ASCENDING) {
                    if ($aCustomerProductName < $bCustomerProductName) {
                        return -1;
                    }

                    return 1;
                } else {
                    if ($aCustomerProductName < $bCustomerProductName) {
                        return 1;
                    }

                    return -1;
                }
            }

            if($propertiesString == 'price.currentPrice'){

                $aCurrentPrice = $a->getPrice()->getCurrentPrice();
                $bCurrentPrice = $b->getPrice()->getCurrentPrice();

                if ($aCurrentPrice == $bCurrentPrice) {
                    return 0;
                }

                if ($order == QueryInterface::ORDER_ASCENDING) {
                    if ($aCurrentPrice < $bCurrentPrice) {
                        return -1;
                    }

                    return 1;
                } else {
                    if ($aCurrentPrice < $bCurrentPrice) {
                        return 1;
                    }

                    return -1;
                }
            }

        });
    }
}
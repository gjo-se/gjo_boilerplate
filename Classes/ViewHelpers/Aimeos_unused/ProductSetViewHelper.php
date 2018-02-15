<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @copyright Aimeos (aimeos.org), 2017
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers\Aimeos;

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class ProductSetViewHelper extends AbstractViewHelper
{
    public function initializeArguments()
    {
        $this->registerArgument('productItem', 'Aimeos\MShop\Product\Item\Standard', 'Aimeos ProductItem');
        $this->registerArgument('getParam', 'Boolean', 'get Param from URL, productSet=XY');
    }

    public function render()
    {
        $iface = '\Aimeos\MW\View\Iface';
        $view  = $this->templateVariableContainer->get('_aimeos_view');

        if (!is_object($view) || !($view instanceof $iface)) {
            throw new Exception('Aimeos view object is missing');
        }


        switch ($this->arguments['property']) {
            case 'price':
                $property = $this->getPrice($serviceItem);
                break;
            case 'short-text':
                $property = $this->getShortText($serviceItem);
                break;
            default:
                $property = NULL;
        }

        $productSet = null;
        if($this->arguments['productItem']){
            $productSet = $this->getProductSet($this->arguments['productItem']);
        }elseif ($this->arguments['getParam']){
            $productSetId = $_GET['productSet'];
            $productSet = $this->getProductSet(null, $productSetId);
        }

        return $productSet;
    }

    private function getProductSet($productItem = null, $productSetUid = null)
    {
        $productSetRepository = $this->objectManager->get('GjoSe\GjoTiger\Domain\Repository\ProductSetRepository');

        if($productItem){
            $productSetQueryResult = $productSetRepository->findByAimeosProductId($productItem->getId());

            $productSet = NULL;
            if($productSetQueryResult){
                $productSet = $productSetQueryResult->getFirst();
            }

        }elseif ($productSetUid){
            $productSet = $productSetRepository->findByUid($productSetUid);
        }

        return $productSet;
    }
}
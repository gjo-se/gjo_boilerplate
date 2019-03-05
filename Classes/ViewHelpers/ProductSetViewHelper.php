<?php
//TODO: hier ist eine Abhängigkeit zur gjo_tiger?!
namespace GjoSe\GjoBoilerplate\ViewHelpers;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;
use GjoSe\GjoTiger\Domain\Repository\ProductSetVariantRepository;

/**
 * Class ProductSetViewHelper
 * @package GjoSe\GjoBoilerplate\ViewHelpers
 */
class ProductSetViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument(
            'productSetVariantUid',
            'integer',
            'productSetVariantUid',
            true
        );
    }

    /**
     * @var \GjoSe\GjoTiger\Domain\Repository\ProductSetVariantRepository
     */
    protected $productSetVariantRepository;

    /**
     * @param \GjoSe\GjoTiger\Domain\Repository\ProductSetVariantRepository
     */
    public function injectProductSetVariantRepository(ProductSetVariantRepository $productSetVariantRepository)
    {
        $this->productSetVariantRepository = $productSetVariantRepository;
    }



    public function render()
    {
        if (!isset($this->arguments['productSetVariantUid'])) {
            throw new Exception('Attribute "productSetVariantUid" missing for ' . __class__ );
        }

        $productSetVariantUid = $this->arguments['productSetVariantUid'];

        $productSetVariantObj = $this->productSetVariantRepository->findByUid($productSetVariantUid, false, false);

        $productSet = null;
        if($productSetVariantObj){
            $productSetVariantGroupObjectStorage = $productSetVariantObj->getProductSetVariantGroup();

            if($productSetVariantGroupObjectStorage){
                foreach ($productSetVariantGroupObjectStorage as $productSetVariantGroup) {
                    $productSet = $productSetVariantGroup->getProductSet();
                }
            }
        }

        return $productSet;
    }
}
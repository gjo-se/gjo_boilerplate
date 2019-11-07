<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers\FeUser;

use GjoSe\GjoBoilerplate\ViewHelpers\FeUser\AbstractFeUserViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class VatPriceViewHelper extends AbstractFeUserViewHelper
{

    public function initializeArguments()
    {
        $this->registerArgument(
            'productSetVariant',
            'GjoSe\GjoTiger\Domain\Model\ProductSetVariant',
            'productSetVariant',
            false
        );

        $this->registerArgument(
            'orderproduct',
            'GjoSe\GjoShop\Domain\Model\Orderproducts',
            'orderproduct',
            false
        );

        $this->registerArgument(
            'productSetVariantGroups',
            'TYPO3\CMS\Extbase\Persistence\ObjectStorage',
            'productSetVariantGroups',
            false
        );

        $this->registerArgument(
            'lowestPrice',
            'boolean',
            'lowestPrice',
            false
        );
    }

    public function render()
    {
        $feUserData = $GLOBALS['TSFE']->fe_user->user;
        $feUserObj  = $this->feUserRepository->findByUid($feUserData['uid']);

        if ($feUserObj) {
            $feUserGroupsObj = $feUserObj->getUserGroup();

            foreach ($feUserGroupsObj as $feUserGroup) {
                if ($feUserGroup->isTxGjoExtendsFemanagerVatIncl()) {
                    $price = $this->getDisplayPrice();
                } else {
                    $price = $this->getDisplayPrice(false);
                }
            }
        } else {
            $price = $this->getDisplayPrice();
        }

        return $price;
    }

    protected function getDisplayPrice($priceInclVat = true)
    {
        $productSetVariant       = $this->arguments['productSetVariant'];
        $orderproduct            = $this->arguments['orderproduct'];
        $productSetVariantGroups = $this->arguments['productSetVariantGroups'];
        $lowestPrice             = $this->arguments['lowestPrice'];

        $displayPrice = null;

        if ($productSetVariant) {
            if ($priceInclVat) {
                $tmpPrice = $productSetVariant->getPrice() + ($productSetVariant->getPrice() * $productSetVariant->getTax() / 100);
            } else {
                $tmpPrice = $productSetVariant->getPrice();
            }

            $displayPrice = $tmpPrice;
        } elseif ($lowestPrice) {
            foreach ($productSetVariantGroups as $productSetVariantGroup) {
                $productSetVariants = $productSetVariantGroup->getProductSetVariants();

                $prices = array();
                if ($productSetVariants) {
                    foreach ($productSetVariants as $key => $productSetVariant) {
                        if ($priceInclVat) {
                            $tmpPrice = $productSetVariant->getPrice() + ($productSetVariant->getPrice() * $productSetVariant->getTax() / 100);
                        } else {
                            $tmpPrice = $productSetVariant->getPrice();
                        }

                        array_push($prices, $tmpPrice);
                    }
                }
            }

            $displayPrice = min($prices);
        } elseif ($orderproduct) {
            if ($priceInclVat) {
                $tmpPrice = $orderproduct->getProductPrice() + ($orderproduct->getProductPrice() * $orderproduct->getProductVat() / 100);
            } else {
                $tmpPrice = $orderproduct->getProductPrice();
            }

            $displayPrice = $tmpPrice;
        }

        return $displayPrice;
    }
}
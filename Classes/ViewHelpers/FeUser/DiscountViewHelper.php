<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @copyright Aimeos (aimeos.org), 2017
 * @package   TYPO3
 */

//TODO: hier gibt es eine Abhänigkeit zu femanager
// sollte ich die ViewHelper nicht in die entsprechenden EXT verlagern?!
// und jeweils den Pfad für den Namespace erweitern
namespace GjoSe\GjoBoilerplate\ViewHelpers\FeUser;

use GjoSe\GjoBoilerplate\ViewHelpers\FeUser\AbstractFeUserViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class DiscountViewHelper extends AbstractFeUserViewHelper
{

    public function render()
    {
        $maxDiscount = 0;

        $feUserData = $GLOBALS['TSFE']->fe_user->user;

        if (null === $feUserData) {
            return null;
        }

        $feUserObj = $this->feUserRepository->findByUid($feUserData['uid']);

        if ($feUserObj) {
            $feUserGroupsObj = $feUserObj->getUserGroup();

            $discounts = array();
            foreach ($feUserGroupsObj as $feUserGroup) {

                if ($feUserGroup) {
                    array_push($discounts, $feUserGroup->getTxGjoExtendsFemanagerDiscount());
                }
            }

            $maxDiscount = max($discounts);
        }

        return $maxDiscount;
    }
}
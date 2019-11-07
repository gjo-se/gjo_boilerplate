<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers\FeUser;

use GjoSe\GjoBoilerplate\ViewHelpers\FeUser\AbstractFeUserViewHelper;

class VatTextViewHelper extends AbstractFeUserViewHelper
{
    public function render()
    {
        $translationKey = 'priceInclVat';

        $feUserData = $GLOBALS['TSFE']->fe_user->user;
        $feUserObj = $this->feUserRepository->findByUid($feUserData['uid']);

        if($feUserObj){
            $feUserGroupsObj = $feUserObj->getUserGroup();

            foreach ($feUserGroupsObj as $feUserGroup) {
                if(!$feUserGroup->isTxGjoExtendsFemanagerVatIncl()){
                    $translationKey = 'priceExclVat';
                }
            }
        }

        return $translationKey;
    }
}
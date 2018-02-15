<?php

/**
 * @license   GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @copyright Aimeos (aimeos.org), 2017
 * @package   TYPO3
 */

namespace GjoSe\GjoBoilerplate\ViewHelpers\Aimeos;

use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;

class SpecificMaterialViewHelper extends AbstractViewHelper
{

    public function render()
    {
        $iface = '\Aimeos\MW\View\Iface';
        $view  = $this->templateVariableContainer->get('_aimeos_view');

        if (!is_object($view) || !($view instanceof $iface)) {
            throw new Exception('Aimeos view object is missing');
        }

        $specificMaterialRepository = $this->objectManager->get('GjoSe\GjoTiger\Domain\Repository\SpecificMaterialRepository');

        return $specificMaterialRepository->findAll();
    }
}
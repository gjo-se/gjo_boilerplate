<?php

/**
 * @license GPLv3, http://www.gnu.org/copyleft/gpl.html
 * @copyright Aimeos (aimeos.org), 2017
 * @package TYPO3
 */


namespace GjoSe\GjoBoilerplate\ViewHelpers\Aimeos;

use TYPO3\CMS\Fluid\Core\ViewHelper\Exception;


class ListViewConfigViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{
	protected $escapeOutput = false;


	public function initializeArguments()
	{
		$this->registerArgument( 'key', 'string', 'Configuration key, e.g. client/html/catalog/lists/basket-add' );
	}


	public function render()
	{
		$iface = '\Aimeos\MW\View\Iface';
		$view = $this->templateVariableContainer->get( '_aimeos_view' );

//		TODO: um key erweitern, auswerten:
        // alle oder nur key ausgeben

        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view); // Aimeos\MW\View\Standard
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->url(), 'helper/urlXXXX');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->config('client/html/catalog/lists/url/controller', 'catalog'), 'helper/config');

        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('prefix'), 'prefix'); // Aimeos\MW\View\Standard
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listParams'), 'listParams');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listProductItems'), 'listProductItems');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listProductItems')[1]->getLabel(), 'listProductItem Label');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listProductSort'), 'listProductSort');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listProductTotal'), 'listProductTotal');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listPageSize'), 'listPageSize');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listPageCurr'), 'listPageCurr');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listPagePrev'), 'listPagePrev');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listPageLast'), 'listPageLast');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listPageNext'), 'listPageNext');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('itemPosition'), 'itemPosition');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('promoHeader'), 'promoHeader');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('itemsHeader'), 'itemsHeader');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listHeader'), 'listHeader');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('promoBody'), 'promoBody');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('itemsBody'), 'itemsBody');
        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('listBody'), 'listBody');


        //TODO: die funktionieren so nicht
//        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->paths(), 'engines');
//        \TYPO3\CMS\Extbase\Utility\DebuggerUtility::var_dump($view->get('paths'), 'paths');

	}
}
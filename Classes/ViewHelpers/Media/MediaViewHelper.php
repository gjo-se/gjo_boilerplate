<?php

namespace GjoSe\GjoBoilerplate\ViewHelpers\Media;

use TYPO3\CMS\Core\Resource\FileInterface;
use TYPO3\CMS\Core\Imaging\ImageManipulation\CropVariantCollection;
use TYPO3\CMS\Core\Resource\FileReference;
use TYPO3\CMS\Core\Imaging\ImageManipulation\Area;
use TYPO3\CMS\Fluid\ViewHelpers\MediaViewHelper as CoreMediaViewHelper;
use GjoSe\GjoBoilerplate\Utility\ResponsiveImagesUtility;
use GjoSe\GjoBoilerplate\Utility\SettingsUtility;
use TYPO3\CMS\Core\Resource\Rendering\RendererRegistry;

class MediaViewHelper extends CoreMediaViewHelper
{

    /**
     * @var \GjoSe\GjoBoilerplate\Utility\SettingsUtility
     */
    protected $settingsUtility;

    protected $breakpoints = array();

    protected $witdh = array();

    /**
     * @param \GjoSe\GjoBoilerplate\Utility\SettingsUtility
     */
    public function injectSettingsUtility(SettingsUtility $settingsUtility)
    {
        $this->settingsUtility = $settingsUtility;
    }

    /**
     * Initialize arguments.
     */
    public function initializeArguments()
    {
        parent::initializeArguments();
        $this->registerArgument('srcset', 'mixed', 'Image sizes that should be rendered.', false);
        $this->registerArgument(
            'sizes',
            'string',
            'Sizes query for responsive image.',
            false,
            '(min-width: %1$dpx) %1$dpx, 100vw'
        );
        $this->registerArgument('breakpoints', 'array', 'Image breakpoints from responsive design.', false);
        $this->registerArgument('contentElementData', 'array', 'Data-Array of ContentElement', false);
        $this->registerArgument('picturefill', 'bool', 'Use rendering suggested by picturefill.js', false, true);
        $this->registerArgument('lazyload', 'bool', 'Generate markup that supports lazyloading', false, false);
    }

    /**
     * Render a given media file
     *
     * @return string Rendered tag
     * @throws \UnexpectedValueException
     */
    public function render()
    {
        $file             = $this->arguments['file'];
        $additionalConfig = $this->arguments['additionalConfig'];

        $this->breakpoints = $this->getBreakPoints();

        if ($this->arguments['width']) {
            $width = $this->arguments['width'];
        } elseif (count($this->witdh)) {
            $width = max($this->witdh);
        }

        $height = $this->arguments['height'];

        // get Resource Object (non ExtBase version)
        if (is_callable([$file, 'getOriginalResource'])) {
            // We have a domain model, so we need to fetch the FAL resource object from there
            $file = $file->getOriginalResource();
        }

        if (!($file instanceof FileInterface || $file instanceof AbstractFileFolder)) {
            throw new \UnexpectedValueException('Supplied file object type ' . get_class($file) . ' must be FileInterface or AbstractFileFolder.',
                1454252193);
        }

        $fileRenderer = RendererRegistry::getInstance()->getRenderer($file);

        // Fallback to image when no renderer is found
        if ($fileRenderer === null) {
            return $this->renderImage($file, $width, $height);
        } else {
            $additionalConfig = array_merge_recursive($this->arguments, $additionalConfig);

            return $fileRenderer->render($file, $width, $height, $additionalConfig);
        }
    }

    /**
     * Render img tag
     *
     * @param  FileInterface $image
     * @param  string        $width
     * @param  string        $height
     *
     * @return string                 Rendered img tag
     */
    protected function renderImage(FileInterface $image, $width, $height)
    {
        if ($this->getBreakPoints()) {
            return $this->renderPicture($image, $width, $height);
        } elseif ($this->arguments['srcset']) {
            return $this->renderImageSrcset($image, $width, $height);
        } else {
            return parent::renderImage($image, $width, $height);
        }
    }

    /**
     * Render picture tag
     *
     * @param  FileInterface $image
     * @param  string        $width
     * @param  string        $height
     *
     * @return string                 Rendered picture tag
     */
    protected function renderPicture(FileInterface $image, $width, $height)
    {
        // Get crop variants
        $cropString            = $image instanceof FileReference ? $image->getProperty('crop') : '';
        $cropVariantCollection = CropVariantCollection::create((string)$cropString);

        $cropVariant = $this->arguments['cropVariant'] ?: 'default';
        $cropArea    = $cropVariantCollection->getCropArea($cropVariant);
        $focusArea   = $cropVariantCollection->getFocusArea($cropVariant);

        // Generate fallback image
        $fallbackImage = $this->generateFallbackImage($image, $width, $cropArea);

        // Generate picture tag
        $this->tag = $this->getResponsiveImagesUtility()->createPictureTag(
            $image,
            $fallbackImage,
            $this->getBreakPoints(),
            $cropVariantCollection,
            $focusArea,
            null,
            $this->tag,
            $this->arguments['picturefill'],
            false,
            $this->arguments['lazyload']
        );

        return $this->tag->render();
    }

    /**
     * Render img tag with srcset/sizes attributes
     *
     * @param  FileInterface $image
     * @param  string        $width
     * @param  string        $height
     *
     * @return string                 Rendered img tag
     */
    protected function renderImageSrcset(FileInterface $image, $width, $height)
    {
        // Get crop variants
        $cropString            = $image instanceof FileReference ? $image->getProperty('crop') : '';
        $cropVariantCollection = CropVariantCollection::create((string)$cropString);

        $cropVariant = $this->arguments['cropVariant'] ?: 'default';
        $cropArea    = $cropVariantCollection->getCropArea($cropVariant);
        $focusArea   = $cropVariantCollection->getFocusArea($cropVariant);

        // Generate fallback image
        $fallbackImage = $this->generateFallbackImage($image, $width, $cropArea);

        // Generate image tag
        $this->tag = $this->getResponsiveImagesUtility()->createImageTagWithSrcset(
            $image,
            $fallbackImage,
            $this->arguments['srcset'],
            $cropArea,
            $focusArea,
            $this->arguments['sizes'],
            $this->tag,
            $this->arguments['picturefill'],
            false,
            $this->arguments['lazyload']
        );

        return $this->tag->render();
    }

    /**
     * Generates a fallback image for picture and srcset markup
     *
     * @param  FileInterface $image
     * @param  string        $width
     * @param  Area          $cropArea
     *
     * @return FileInterface
     */
    protected function generateFallbackImage(FileInterface $image, $width, Area $cropArea)
    {
        $processingInstructions = [
            'width' => $width,
            'crop'  => $cropArea->isEmpty() ? null : $cropArea->makeAbsoluteBasedOnFile($image),
        ];
        $imageService           = $this->getImageService();
        $fallbackImage          = $imageService->applyProcessingInstructions($image, $processingInstructions);

        return $fallbackImage;
    }

    /**
     * Returns an instance of the responsive images utility
     * This fixes an issue with DI after clearing the cache
     *
     * @return ResponsiveImagesUtility
     */
    protected function getResponsiveImagesUtility()
    {
        return $this->objectManager->get(ResponsiveImagesUtility::class);
    }

    protected function getBreakPoints()
    {
        if ($this->arguments['breakpoints']) {
            return $this->arguments['breakpoints'];
        } else {
            $settings     = $this->settingsUtility->getSettings('extension', 'gjointroduction');
            $cropVariants = $settings['cropVariants'];

            $breakpoints = array();
            foreach ($cropVariants as $key => $cropVariant) {
                $breakpoints[] = [
                    'cropVariant' => $key,
                    'media'       => $cropVariant['media'],
                    'srcset'      => [$this->getSrcset($key)],
                    'sizes'       => $cropVariant['media'] . ' ' . $this->getSrcset($key, $this->getColCountsArray()) . 'px'
                ];
            }

            return $breakpoints;
        }
    }

    protected function getContentElementData()
    {
        if (isset($this->arguments['contentElementData'])) {
            return $this->arguments['contentElementData'];
        }

        return false;
    }

    protected function getGridelementsColumn()
    {
        if ($this->getContentElementData()) {
            return $this->getContentElementData()['tx_gridelements_columns'];
        }

        return false;
    }

    protected function getParentgridFlexformColCss()
    {
        $parentgridFlexformColCss = 'parentgrid_flexform_col' . $this->getGridelementsColumn() . '_css';

        if (isset($this->getContentElementData()[$parentgridFlexformColCss])) {
            return $this->getContentElementData()[$parentgridFlexformColCss];
        }

        return false;
    }

    protected function getColCountsArray()
    {
        $parentgridFlexformColCss = explode(' ', $this->getParentgridFlexformColCss());
        $breakpointColCounts      = array();
        foreach ($parentgridFlexformColCss as $parentgridFlexformColCssValue) {

            $serachString = '/col-[0-9]/';
            if (preg_match($serachString, $parentgridFlexformColCssValue)) {
                $breakpointColCounts['mobile']['col'] = substr($parentgridFlexformColCssValue, strlen('col-'));
            }

            $serachString = '/col-sm-[0-9]/';
            if (preg_match($serachString, $parentgridFlexformColCssValue)) {
                $breakpointColCounts['tablet']['col'] = substr($parentgridFlexformColCssValue, strlen('col-sm-'));
            }

            $serachString = '/col-md-[0-9]/';
            if (preg_match($serachString, $parentgridFlexformColCssValue)) {
                $breakpointColCounts['laptop']['col'] = substr($parentgridFlexformColCssValue, strlen('col-md-'));
            }

            $serachString = '/col-lg-[0-9]/';
            if (preg_match($serachString, $parentgridFlexformColCssValue)) {
                $breakpointColCounts['desktop']['col'] = substr($parentgridFlexformColCssValue, strlen('col-lg-'));
            }

            $serachString = '/col-xl-[0-9]/';
            if (preg_match($serachString, $parentgridFlexformColCssValue)) {
                $breakpointColCounts['widescreen']['col'] = substr($parentgridFlexformColCssValue, strlen('col-xl-'));
            }
        }

        return $breakpointColCounts;
    }

    protected function getSrcset($key)
    {
        $settings       = $this->settingsUtility->getSettings('extension', 'gjointroduction');
        $containerWidth = intval($settings['cropVariants'][$key]['container']);
        $gridSystem     = intval($settings['gridSystem']);

        $colWidthWideScreen = intval($this->getColCountsArray()['wideScreen']['col']);
        $colWidthDesktop = intval($this->getColCountsArray()['desktop']['col']);
        $colWidthLaptop  = intval($this->getColCountsArray()['laptop']['col']);
        $colWidthTablet  = intval($this->getColCountsArray()['tablet']['col']);
        $colWidthMobile  = intval($this->getColCountsArray()['mobile']['col']);

        $widestImage = array();
        if ($key == 'wideScreen') {

            if ($colWidthWideScreen) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthWideScreen;
            }
            if ($colWidthDesktop) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthDesktop;
            }
            if ($colWidthLaptop) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthLaptop;
            }
            if ($colWidthTablet) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthTablet;
            }
            if ($colWidthMobile) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthMobile;
            }
        }

        if ($key == 'desktop') {

            if ($colWidthDesktop) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthDesktop;
            }
            if ($colWidthLaptop) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthLaptop;
            }
            if ($colWidthTablet) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthTablet;
            }
            if ($colWidthMobile) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthMobile;
            }
        }

        if ($key == 'laptop') {

            if ($colWidthLaptop) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthLaptop;
            }
            if ($colWidthTablet) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthTablet;
            }
            if ($colWidthMobile) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthMobile;
            }
        }

        if ($key == 'tablet') {
            if ($colWidthTablet) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthTablet;
            }
            if ($colWidthMobile) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthMobile;
            }
        }

        if ($key == 'mobile') {
            if ($colWidthMobile) {
                return $this->witdh[] = $containerWidth / $gridSystem * $colWidthMobile;
            }
        }
    }
}

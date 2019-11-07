<?php

namespace GjoSe\GjoBoilerplate\Service;

/***************************************************************
 *  created: 08.02.18 - 15:49
 *  Copyright notice
 *  (c) 2017 Gregory Jo Erdmann <gregory.jo@gjo-se.com>
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

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Mail\MailMessage;
use TYPO3\CMS\Fluid\View\StandaloneView;

class SendMailService extends AbstractService
{
    const LAYOUT_ROOT_PATH = '/Resources/Private/Layouts/';
    const TEMPLATE_ROOT_PATH = '/Resources/Private/Templates/Email/';

    public function sendMail($emailAddresses, $emailTemplate, $subject, $assignMultiple = array(), $contentType = 'text/html')
    {
        /** @var \TYPO3\CMS\Core\Mail\MailMessage $email */
        $email = $this->objectManager->get(MailMessage::class);

        $emailView               = $this->objectManager->get(StandaloneView::class);
        $layoutRootPath          = GeneralUtility::getFileAbsFileName('EXT:' . $emailTemplate['extensionKey'] . self::LAYOUT_ROOT_PATH);
        $templateRootPath        = GeneralUtility::getFileAbsFileName('EXT:' . $emailTemplate['extensionKey'] . self::TEMPLATE_ROOT_PATH);

        switch ($contentType) {
            case ('text/html'):
                $emailTemplateExtension = '.html';
                break;
            case ('txt'):
                $emailTemplateExtension = '.txt';
                break;
            default:
                $emailTemplateExtension = '.html';
        }

        $templatePathAndFilename = $templateRootPath . $emailTemplate['fileName'] . $emailTemplateExtension;

        $emailView->setLayoutRootPaths(array($layoutRootPath));
        $emailView->setTemplatePathAndFilename($templatePathAndFilename);
        $emailView->assignMultiple($assignMultiple);


        $email
            ->setFrom(array(
                $emailAddresses['fromMail'] => $emailAddresses['fromName']
            ))
            ->setTo(array(
                $emailAddresses['toMail'] => $emailAddresses['toName']

            ))
            ->setSubject($subject)
            ->setBody($emailView->render(), $contentType);
        //        ->attach(Swift_Attachment::fromPath('my-document.pdf'))

        if(isset($emailAddresses['ccMail']) && isset($emailAddresses['ccName'])){
            $email->setCc(array(
                $emailAddresses['ccMail'] => $emailAddresses['ccName']
            ));
        }

        if(isset($emailAddresses['bccMail']) && isset($emailAddresses['bccName'])){
            $email->setBcc(array(
                $emailAddresses['bccMail'] => $emailAddresses['bccName']
            ));
        }

        return $email->send();
    }

}
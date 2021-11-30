import React, { FC } from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './style';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const TermsOfUsePage: FC = () => {
  const classes = useStyles();

  return (
    <Grid className={ classes.page }>
      <Header/>
      <Grid className={ classes.introSection }>
        <Grid className={ clsx(classes.wrapper, classes.introWrapper) }>
          <Typography className={ classes.introHeadline } component="h2">
            Terms of Use
          </Typography>
        </Grid>
      </Grid>
      <Grid className={ classes.main }>
        <Grid className={ classes.wrapper }>
          <Grid>
            <Typography className={ classes.sectionText }>
              Please read this Terms of Use carefully before using this website.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionText }>
              This website, <Link className={ classes.sectionLink } href={ window.location.origin }>
                {window.location.hostname}
              </Link> the ("Website"), is owned and operated by BlockSettle AB,
              a private limited corporation in Sweden. This Terms of Use and our Privacy Policy, jointly
              (the "Agreement") applies to any and all websites operated by BlockSettle AB and/or its subsidiaries. 
              This Agreement is a legal contract between you and BlockSettle and applies to your use of the Website,
              including any information and materials therein and any software that BlockSettle makes available
              that allows you to access the website.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              By accessing all or any part of this Website, you fully accept and agree to comply with all of the terms
              and conditions set out in this Agreement. You are not permitted to use this Website except as provided in
              this Agreement. If you do not agree to be bound by this Agreement, you are not authorized to access and use
              this Website and should therefore exit the website. PLEASE READ THIS AGREEMENT IN ENTIRETY.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Additional Terms
            </Typography>
            <Typography className={ classes.sectionText }>
              This Agreement does not govern your use of the BlockSettle Terminal and/or BlockSettle Client Portal, your use 
              of which is governed by their respective (i) agreements you have entered to access and use these services and
              (ii) terms of those services.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              No Warranty
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              BlockSettle, its subsidiaries and third party providers as defined below does not warrant the accuracy or
              timeliness of any data, information and materials contained on the Website. BlockSettle has no liability for
              any loss of, or errors or omissions, whether provided by BlockSettle, our licensors or suppliers or other
              users.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              The information and materials have not been verified or authenticated in whole or in part by BlockSettle, or
              any other party, and they may include inaccuracies or typographical or other errors. Your use of the Website
              is at your own risk.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              BlockSettle, its subsidiaries and third party providers as defined below disclaims liability for errors,
              omissions or other defects, delays or interruptions in this information and materials.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              BlockSettle, its subsidiaries and third party providers as defined below makes no warranty or guarantee that the
              Website is free from viruses, security threats and that the Website will always be secure.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Any downloads from the Website, or retrieved information or materials on the Website, is done at your own risk
              and you will be solely responsible for any loss to you that results from the download or use of such information
              and materials.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Limited Liability
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              BlockSettle, its subsidiaries and third party providers as defined below will in no event be liable for any damages
              or expenses arising out of or relating to your use of the website.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Links to other Internet Resources
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Links to other internet resources are used by you at your own risk; BlockSettle, its subsidiaries and third
              party providers as defined below does not monitor or verify the content or accuracy provided by these resources
              in any way and is not liable for any aspect of such resources or any consequence arising from your use of those
              resources. By providing access to the linked websites, neither BlockSettle nor its Third Party Providers are
              recommending, endorsing or sponsoring any aspect of those websites, including the transmission of software,
              downloading or uploading of content, or any goods, services or securities available thereon. You forever hold
              BlockSettle and its Third Party Providers harmless from any and all claims, obligations and/or liability arising
              in connection with the use of any such links.
            </Typography>
          </Grid>


          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Indemnity
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              With this Agreement you agree to indemnify and hold harmless BlockSettle and its officers, agents, and employees
              from and against any and all claims, demands, expenses, damages and or penalties arising out of any failure by
              you or any agent acting on your behalf to fully observe this Agreement or by reason of any use by you or such
              agent of any information, materials and downloads provided on this Website.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              No Recommendation or Advice Given
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              This Website and all content have been prepared for informational and/or educational purposes only and is not to be
              construed as a recommendation or offer to buy or sell or the solicitation of an offer to buy or sell any security,
              financial product or instrument, or to participate in any particular trading strategy. Neither BlockSettle, the
              Third Party Providers, nor any of their respective affiliates, officers, directors, employees, agents or licensors
              are soliciting any action based on information, materials or downloads made available on this Website.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              BlockSettle does not make any recommendations regarding the merit of any company, security or other financial
              product or investment identified on this Website, nor does it make any recommendation regarding the purchase or
              sale of any such company, security, financial product or investment that may be described or referred to on this
              Website, nor endorse or sponsor any company identified on this Website.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Neither BlockSettle nor Third Party Providers (defined below) shall be liable for any investment decisions
              based upon or results obtained from the content provided on this Website. Nothing contained on this Website
              is intended to be, nor shall it be construed to be, legal, tax, accounting or investment advice.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              This Website is not directed at or intended for publication or distribution to any person in any jurisdiction
              where doing so would result in contravention of any applicable laws or regulations. It is your sole responsibility
              to comply with all to you applicable laws or regulations.
            </Typography>
          </Grid>


          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Proprietary Rights, Trademark and Copyright
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Unless otherwise indicated by BlockSettle, all copyright and other intellectual property rights in all
              content and other materials contained on the Website or, including, without limitation, the BlockSettle
              logo and all designs, text, graphics, pictures, information, data, software, sound files, other files and
              the selection and arrangement thereof (collectively, "BlockSettle Materials") are the proprietary property
              of BlockSettle or our licensors or suppliers and are protected by European and international copyright
              laws and other intellectual property rights laws.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Aspects of the content of this Website are also protected by intellectual property laws, including but not
              limited to copyright, trademark, trade dress, domain name, patent, trade secret, international treaties
              and other proprietary rights and laws of the European Union countries and other countries
              ("Intellectual Property laws").
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              You acknowledge and agree that BlockSettle, its applicable affiliates, and/or the Third Party Provider, as
              relevant, shall own all right, title and interest in the content of this Website and all intellectual
              property relating thereto or otherwise referenced in this Website. Nothing contained on this Website should
              be construed as granting, by implication, any license or right to use any of the content, trademarks,
              copyrights, or other proprietary material without the express written permission of BlockSettle or such
              other party as may own the proprietary rights therein and any rights not expressly granted herein are
              reserved to BlockSettle or its Third Party Providers, as applicable.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              You may not not sell, license, rent, modify, print, collect, copy, reproduce, download, upload, transmit,
              disclose, distribute, disseminate, edit, adapt, electronically extract or scrub, compile or create derivative
              works from any content or materials or otherwise transfer any of the content to any third person.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              You agree not to challenge (or assist any third party to challenge) the validity or enforceability of any
              intellectual property owned by BlockSettle or its applicable affiliates relating to this Website, its
              content or otherwise referenced therein, including but not limited to the patents and trademarks listed at
              the end of this Agreement.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Prohibited Use
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              You agree not to:
            </Typography>
            <ul className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                Use this Website in any manner that could damage, disable, overburden or impair any
                BlockSettle server, or the network(s) connected to any BlockSettle server, or interfere with any other
                party’s use and enjoyment of this Website.
              </li>
              <li className={ classes.sectionText }>
                Attempt to gain unauthorized access to this Website or any services, other accounts, computer systems
                or networks connected to any BlockSettle server or to any of the services, through hacking, password
                mining or any other means.
              </li>
              <li className={ classes.sectionText }>
                Obtain or attempt to obtain any materials or information through any means not intentionally made
                available through this Website.
              </li>
            </ul>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              This list of prohibitions provides examples and is not complete or exclusive. Unauthorized use of
              the Website may violate certain laws and regulations.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              BlockSettle is not required to, but reserves the right, in its sole discretion, to monitor any and
              all use of this Website.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Feedback
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              If you send or transmit any communications, comments, questions, suggestions, or related materials to
              BlockSettle (collectively, “Feedback”), suggesting or recommending changes to the Website, all such
              Feedback is, and will be treated as, non-confidential and non-proprietary. You hereby assign all right,
              title, and interest in, and BlockSettle is free to use, without any attribution or compensation to you,
              any ideas, know-how, concepts, techniques, or other intellectual property and proprietary rights
              contained in the Feedback, whether or not patentable, for any purpose whatsoever, including but not
              limited to, developing, manufacturing, having manufactured, licensing, marketing, and selling, directly
              or indirectly, products and services using such Feedback.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Governing Law
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              By accessing the services on our Website, you agree to be governed by the laws of Sweden. The laws of
              such jurisdiction will govern all matters relating to this Agreement, and the use, or inability to use,
              the services, and that such laws will apply without regard to principles of conflict of laws. This
              choice of jurisdiction does not prevent BlockSettle from seeking injunctive relief with respect to a
              violation of intellectual property rights or confidentiality obligations in any appropriate
              jurisdiction. BlockSettle reserves the right to seek all remedies available at law and in equity for
              violations of this Agreement, including the right to block access from a particular Internet address
              to this Website.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Privacy
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Our Privacy Policy is incorporated in this Agreement and subject to these Terms and Conditions.
              The Privacy Policy is available on the Website.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Revision/Termination of Services
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              BlockSettle has the right, at any time, to modify or discontinue, temporarily or permanently,
              the services, information, materials and other content we offer through the Website, and/or to
              refuse or restrict anyone from access to any such services, information, materials and other
              content, with or without notice and in its sole discretion. BlockSettle has the right at any time
              to revise and to otherwise modify this Agreement, and to impose new or additional Terms or
              Conditions (collectively, "Additional Terms") on your use of the services available on or
              through our Website.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Such Additional Terms are effective immediately and are incorporated into this Agreement when
              posted by BlockSettle to the Website. Use of the Website following such notice indicates your
              acceptance of all such Additional Terms. BlockSettle shall not be liable for any modification,
              suspension or discontinuance of any services.
            </Typography>
          </Grid>

        </Grid>
      </Grid>
      <Footer/>
    </Grid>
  );
};

export default TermsOfUsePage;

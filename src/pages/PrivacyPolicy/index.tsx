import React, { FC } from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './style';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const EMAIL = 'compliance@liquidsepa.com';

const PrivacyPolicyPage: FC = () => {
  const classes = useStyles();

  return (
    <Grid className={ classes.page }>
      <Header/>
      <Grid className={ classes.introSection }>
        <Grid className={ clsx(classes.wrapper, classes.introWrapper) }>
          <Typography className={ classes.introHeadline } component="h2">
            Privacy Policy
          </Typography>
        </Grid>
      </Grid>
      <Grid className={ classes.main }>
        <Grid className={ classes.wrapper }>
          <Grid>
            <Typography className={ classes.sectionText }>
              Please read this Privacy Policy carefully before using this website.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionText }>
              Our Privacy Policy applies to all services offered by Liquid SEPA and its affiliates, unless specifically
              excluded. These Private Policy rules are subject to "Data Protection Laws" which means all laws and
              regulations that apply to or govern the processing of personal data, including but not limited to, the Swedish
              Personal Data Act (Sw. personuppgiftslagen (1998:204)) and any other national data protection laws and
              regulations (including but not limited to, laws and regulations implementing the EU Data Protection Directive
              95/46/EC and the Electronic Communication Privacy Directive 2002/58/EC) and, from 25 May 2018, the General Data
              Protection Regulation (2016/679/EU), and any amendments to or replacements of such laws and regulations.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Personal Information is information which can be used to identify a specific user such as name, address,
              e-mail address and financial details.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              This policy describes how and why we process and collect personal information when you use our services. Also,
              this policy explains how to access and update personal information. By using any of our Service or our website,
              you indicate that you accept this policy and any applicable agreement incorporated by reference.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Your Personal Information Collected by Liquid SEPA
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              BlockSettle AB, Storgatan 5, 211 41 Malmö, Sweden is solely responsible for collecting and processing all
              Personal Data.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Collection and use of Personal Information
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Liquid SEPA undertakes to only collect and process Personal Data necessary for the performance of our
              obligations.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              To provide you with the Services, we are required among other things to verify your identity, according to
              EU Directive 2015/849 and our AML requirements. To fulfill our obligations, we may request and/or collect
              personal information such as your name, date of birth, geographical coordinates, email, telephone number,
              occupation, financial information, etc.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              We may collect personal information when you sign up, log in, use or visit our pages, and when you click on
              links on our pages. We may collect additional information in connection with your participation in any services
              offered by us, third parties and information you provide when giving us feedback.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              We may contact you by post, email or telephone (including SMS) for these purposes. Your confirmation emails
              may include marketing material which we may feel will be of interest to you from third parties. We may use
              your information to send you offers and news about our products and services or those of other selected
              companies which we think may be of interest to you.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Your data may be used for the following purposes: user on-boarding or sign-in process, either directly or via
              engagement of subcontractors. Liquid SEPA use subcontractors for services such as validating the Personal Data,
              screening against EU and UN Sanction lists and perform PEP checks.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              We may monitor your usage of the Services, such as accounting, billing and audit, bank account verification, and
              screening, security, administrative and legal purposes, statistical and marketing analysis, system testing,
              maintenance and development, customer surveys, customer relations, and to help us in any future dealings with you,
              by identifying your requirements and preferences, for example.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              We may share your personal information only when it is required by our obligations, with persons belonging to the
              Company group and also with our service providers whom we have contracted to assist us in providing the services.
              We may share customer information with others, such as advertisers interested in our site or for statistical and
              marketing analysis, in aggregate, anonymous form, which means that the information will not contain any
              personally-identifiable information about you or any other person.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
            Liquid SEPA does not collect any other personal and publicly unavailable information that you do not expressly
              provide. Liquid SEPA will not sell, rent or share your personal information, including your email address, with
              any third parties for marketing purposes without your permission. Liquid SEPA may not transfer Personal Data outside
              of EU/EEA without prior written consent if it isn’t allowed under applicable Data Protection Laws.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              We make every effort to preserve user privacy, we may need to disclose personal information when required by law and
              when we have a good-faith belief that such action is necessary to comply with judicial proceedings, a court order or
              legal process that we receive.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              We may collect demographic and other data, which may include personally-identifiable information, generally through
              surveys and forms which you may or may not choose to participate in.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Security
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              All information described here is stored on restricted database servers. The information is accessible for
              Liquid SEPA personnel. Personnel will process your personal information only to fulfill our stated purposes.
              Liquid SEPA ensures that all personnel have undertaken to observe confidentiality.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Usage Information
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              In addition to collecting personal and non-personal information, we may also collect non-personal, aggregated
              information about subscribers' and users' use of our site. This information is not personally identifiable and will
              only be used to find out how our services and website are used. For example, this information may include how much time
              users spend on our site, from which other sites subscribers came, and to what other sites subscribers go. The
              collection of this ƒinformation allows us to, among other things, prepare for traffic-load demands and to efficiently
              deliver relevant information.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Destruction and alteration
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              All information and documentation collected shall be archived for at least five (5) years after the information was
              collected by Liquid SEPA and five (5) years after termination of the business relationship, according to Directive
              (EU) 2015/849 of the European Parliament and the council of 20 May 2015.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Upon your request, you can access a summary of the information we collect about you. You may have an opportunity to
              correct, update or modify this information yourself as well as the right to ask to be 'forgotten' by sending a request
              to <Link className={ classes.sectionLink } href={ `mailto:${ EMAIL }` } target="_blank">
                { EMAIL }
              </Link>.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Cookies
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              When you access Liquid SEPA, we may make use of the standard practice of placing tiny data files called cookies, flash
              cookies, pixel tags or other tracking tools (herein, "Cookies") on your computer or other devices used to visit Liquid SEPA.
              We use these technologies to help us recognize you as a Participant, collect information about your use of Liquid SEPA to
              better customize our services and content and collect information about your computer or other access device to a) ensure
              compliance with our Compliance Program and b) ensure that your account security has not been compromised by detecting
              irregular or suspicious account activities. By using Liquid SEPA you agree that Liquid SEPA and its affiliates may
              collect and/or transmit any data collected to our third party service providers, such as analytics providers, which may
              also make use of such technologies as described above. Please note that if you block or delete cookies you will not be
              able to use all or a portion of Liquid SEPA.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Upon your request, you can access a summary of the information we collect about you. You may have an opportunity to
              correct, update or modify this information yourself as well as the right to ask to be 'forgotten' by sending a request
              to <Link className={ classes.sectionLink } href={ `mailto:${ EMAIL }` } target="_blank">
                { EMAIL }
              </Link>.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              IP Address
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              When you visit our site, we log standard information such as your IP address, which is a number that can be used to
              identify your location and Internet Service Provider, along with the URL from which you came to our site and the URLs
              visited on our site. A URL is the full address of a web page, which may or may not contain some personally identifiable
              information about the person who is viewing it.
            </Typography>
          </Grid>
          
          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Business Transitions
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              In the event Liquid SEPA goes through a business transition, such as a merger or acquisition by another company,
              or sale of a portion of its assets, users' personal information will, in most instances, be part of the assets
              transferred.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Links to Other Sites
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              As part of the services we provide, we may create links allowing you to access third-party sites.
              Liquid SEPA is not responsible for the content that appears on those sites and does not endorse them.
              Please consult those sites' individual privacy policies in order to determine how they treat user
              information.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Changes to This Policy
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Liquid SEPA reserves the right to change this policy from time to time. If we decide to change our
              privacy policy, we will post those changes on this page so that you are aware of what information we
              collect, how we use it and in what circumstances we disclose it.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Your Security Obligations
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Your online access to certain of your personal information may be protected by Auth eID.You have an
              obligation to keep your user ID, Auth eID credentials, and personal information secure.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Your Consent
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              In using Liquid SEPA' s website or services, you consent to the collection and use of this
              information by Liquid SEPA in ways described above.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              Complaints/Comments
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Liquid SEPA takes your privacy concerns seriously.If you have any questions about this policy
              or if you believe that Liquid SEPA has not complied with this Privacy Policy with respect to your
              personal information, you may write to <Link className={ classes.sectionLink } href={ `mailto:${ EMAIL }` } target="_blank">
                { EMAIL }
              </Link> or send a letter to us at BlockSettle AB, Storgatan 5, 211 41 Malmö, Sweden.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Footer/>
    </Grid>
  );
};

export default PrivacyPolicyPage;

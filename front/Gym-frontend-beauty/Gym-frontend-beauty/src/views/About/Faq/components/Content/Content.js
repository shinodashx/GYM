import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqGroupItem = ({ title, items }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h5'}
          align={'left'}
        >
          {title}
        </Box>
      </Box>
      <Box>
        {items.map((item, i) => (
          <Box
            component={Accordion}
            key={i}
            paddingY={1}
            elevation={0}
            sx={{
              '&:first-of-type': {
                borderTopLeftRadius: theme.spacing(1),
                borderTopRightRadius: theme.spacing(1),
              },
              '&:not(:first-of-type):before': {
                opacity: '1 !important',
                display: 'block !important',
              },
              '&.Mui-expanded': {
                margin: 0,
              },
            }}
          >
            <Box
              component={AccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel1a-header--${i}`}
              padding={`${theme.spacing(0)} !important`}
            >
              <Typography fontWeight={600}>{item.title}</Typography>
            </Box>
            <AccordionDetails>
              <Typography color="text.secondary">{item.subtitle}</Typography>
            </AccordionDetails>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

FaqGroupItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

const Content = () => {
  return (
    <Box>
      <Box marginBottom={6}>
        <FaqGroupItem
          title={'Basics'}
          items={[
            {
              title: ' How do I reserve a spot at the sports facility?',
              subtitle:
                'To reserve a spot at the sports facility, you can either visit our website or use our application. Our website has a user-friendly interface where you can select the date and time you wish to reserve and complete the booking process.',
            },
            {
              title: 'What are the operating hours of the sports facility?',
              subtitle:
                'The operating hours of the sports facility vary depending on the day of the week. Typically, we are open from 8 AM to 10 PM Monday to Friday, and from 9 AM to 8 PM on weekends. However, please check our website or contact us for the most up-to-date information on our operating hours.',
            },
            {
              title: 'Can I cancel or modify my reservation?',
              subtitle:
                'Yes, you can cancel or modify your reservation by contacting us either through our website or customer service hotline. Please note that there may be a cancellation fee if you cancel your reservation within a certain period of time before the scheduled booking.'},
            {
              title: 'What types of sports facilities are available for reservation?',
              subtitle:
                'We have a variety of sports facilities available for reservation, including basketball courts, tennis courts, soccer fields, and swimming pools. Please check our website or contact us for more information on the specific facilities and amenities we offer.'},
            {
              title: 'Are there any membership or loyalty programs available?',
              subtitle:
                'Yes, we offer membership and loyalty programs for frequent users of our sports facilities. These programs provide discounts on reservations, access to exclusive amenities, and other benefits. Please check our website or contact us for more information on our membership and loyalty programs.'},
          ]}
        />
      </Box>
      <Box marginBottom={6}>
        <FaqGroupItem
          title={'Account & settings'}
          items={[
            {
              title: 'How do I create an account on the sports facility reservation system?',
              subtitle:
                'To create an account on the sports facility reservation system, simply visit our website and click on the "Sign Up" button. You will be prompted to provide your name, email address, phone number, and other relevant information. Once you have completed the registration process, you will be able to log in and start making reservations.'
            },
            {
              title: 'Can I change my password or update my personal information?',
              subtitle:
                'Yes, you can change your password or update your personal information by logging into your account and accessing the "Settings" section. From there, you can edit your profile information, change your password, and manage other account settings as needed.'
            },
            {
              title: 'How do I delete my account?',
              subtitle:
                'If you wish to delete your account, please contact our customer service team either through our website or by phone. Our representatives will be happy to assist you with the account deletion process.',
            },
            {
              title: 'How do I view my reservation history?',
              subtitle:
                'To view your reservation history, log into your account and click on the "Reservations" tab. From there, you can view a list of all your past and upcoming reservations, as well as any relevant details such as the date, time, and type of facility that was reserved.',
            },
          ]}
        />
      </Box>
      <Box>
        <FaqGroupItem
          title={'Security'}
          items={[
            {
              title: 'How do you ensure the security of my personal and payment information?',
              subtitle:
                'We take the security of your personal and payment information very seriously. Our website uses industry-standard encryption technology to protect your data during transmission. We also adhere to strict data protection regulations and best practices to ensure that your information is stored and processed securely.',
            },
            {
              title: 'Who has access to my personal and payment information?',
              subtitle:
                'Your personal and payment information is only accessible by authorized personnel who require access in order to process your reservations and payments. We do not share your information with third parties without your explicit consent, except as required by law.',
            },
            {
              title: 'What measures do you take to prevent unauthorized access to my account?',
              subtitle:
                'We use a variety of security measures to prevent unauthorized access to your account, including secure password policies, two-factor authentication, and regular security audits. We also recommend that you use strong passwords and keep your login credentials confidential to further protect your account.',
            },
            {
              title: 'What should I do if I suspect that my account has been compromised?',
              subtitle:
                'If you suspect that your account has been compromised, please contact our customer service team immediately. We will work with you to investigate the issue and take appropriate measures to protect your account and data.',
            },
            {
              title: 'Can I trust that my data is safe with your system?',
              subtitle:
                'Yes, you can trust that your data is safe with our system. We take security very seriously and have implemented a range of measures to protect your data from unauthorized access and other security threats. If you have any concerns or questions about our security practices, please do not hesitate to contact us.',
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Content;

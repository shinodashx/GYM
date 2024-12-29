import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PrivacySection = ({ title, description }) => {
  return (
    <Box>
      <Typography
        variant={'h6'}
        gutterBottom
        sx={{
          fontWeight: 'medium',
        }}
      >
        {title}
      </Typography>
      <Typography component={'p'} color={'textSecondary'}>
        {description}
      </Typography>
    </Box>
  );
};

PrivacySection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Content = () => {
  const data = [
    {
      title: '1. What information do we collect?',
      description:
        'We collect personal information such as your name, email address, phone number, and payment information when you make a reservation at our sports facility. We may also collect usage data and other information related to your interaction with our website and system.',
    },
    {
      title: '2. How do we use your information?',
      description:
        'We use your information to process and manage your reservations, communicate with you regarding your bookings, and improve our services. We may also use your information for marketing and promotional purposes with your explicit consent.'
    },
    {
      title: '3. Will your information be shared with anyone?',
      description:
        'We do not share your personal information with third parties without your explicit consent, except as required by law or to facilitate payment processing through third-party payment processors.'
    },
    {
      title: '4. Do we use cookies or other tracking technologies?',
      description:
        'We may use cookies and other tracking technologies to improve your user experience and personalize your interactions with our website and system.'
    },
    {
      title: '5. Is your information transferred internationally?',
      description:
        'We may transfer your information to other countries for processing or storage, provided that appropriate safeguards are in place to protect your data in accordance with applicable data protection regulations.'
    },
    {
      title: '6. How long do we keep your information?',
      description:
        'We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, or as required by law or regulation.'
    },
    {
      title: '7. What are your privacy rights?',
      description:
        'You have the right to access, correct, or delete your personal information, as well as to object to or restrict processing of your data. You may also have the right to data portability, to withdraw your consent, and to lodge a complaint with a supervisory authority.'
    },
    {
      title:
        '8. How can you review, update or delete the data we collect from you?',
      description:
        'You may review, update, or delete your personal information by logging into your account and accessing the "Settings" section. You may also contact our customer service team to request changes to your data.'
    },
  ];
  return (
    <Box>
      {data.map((item, i) => (
        <Box key={i} marginBottom={i < data.length - 1 ? 4 : 0}>
          <PrivacySection {...item} />
        </Box>
      ))}
    </Box>
  );
};

export default Content;

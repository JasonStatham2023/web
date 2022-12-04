/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CompanyIntroduction = (): JSX.Element => {
  return (
    <Box marginBottom={4}>
      <Box marginBottom={2}>
        <Typography
          variant="h4"
          color="text.primary"
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Company Profile
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          sx={{fontWeight: 400}}
          align={'center'}
        >
          Micro Vision life is a formal advertising e-commerce platform.In the increasingly tough
          consumer market, more and more niche products are almost completely uncompetitive or even
          unviable.Compared to the pricey TV placement ads, Micro Vision Life OVB's new advertising
          collocation model is more attractive.We provide a platform for some businesses that are
          just start-up and can't afford the enormous amount of TV advertising costs.Manufacturers
          showcase their goods, while participants provide a lot of flow and exposure, and the
          platform establishes an eco-system.This creates a three-party business model in which each
          party takes what it needs.
          <br />
          The idea of Micro Vision Life is to make every consumers' actions generate value.
          Consumers can conveniently convert their daily active value into cash by contributing it.
          Since the launch of OVB, it has achieved sizable achievements.OVB re-constructs the
          relationship between the platform, merchants and subscribers, which drastically overturns
          the traditional model.
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanyIntroduction;

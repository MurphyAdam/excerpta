import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const productScreenshots = [
  {
    label: 'Code Editor Interface',
    imgPath:
      'https://res.cloudinary.com/lang-code/image/upload/v1606148288/images/Screenshot_from_2020-11-23_17-07-08_t7ejuz.png',
  },
  {
    label: 'Public Snippets by other users',
    imgPath:
      'https://res.cloudinary.com/lang-code/image/upload/v1606149037/images/Screenshot_from_2020-11-23_16-33-23_wddorj.png',
  },
  {
    label: 'Different themes and modes',
    imgPath:
      'https://res.cloudinary.com/lang-code/image/upload/v1606149453/images/Screenshot_from_2020-11-23_17-28-43_xlvbnf.png',
  },
  {
    label: 'Different themes and modes - continue',
    imgPath:
      'https://res.cloudinary.com/lang-code/image/upload/v1606149453/images/Screenshot_from_2020-11-23_17-26-07_jrltg0.png',
  },
  {
    label: 'And, of course, a contextual menu and key-bindings to perform various actions.',
    imgPath:
      'https://res.cloudinary.com/lang-code/image/upload/v1606149659/images/Screenshot_from_2020-11-23_17-33-02_uvrlkm.png',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 550,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = productScreenshots.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography align="center" color="secondary" >
          #{productScreenshots[activeStep].label}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
      >
        {productScreenshots.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;

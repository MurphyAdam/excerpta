import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';

import AceEditor from "react-ace";
import { languages, themes } from '../../constants';
import useWindowDimensions from '../../hooks/useWindowDimensions';

themes.forEach(theme => import(`ace-builds/src-noconflict/theme-${theme}`));
languages.forEach(mode => import(`ace-builds/src-noconflict/mode-${mode}`));

console.log(themes, languages)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    width: 20,
    height: 20,
  },
}));

export default function SnippetShowCase(props) {
  const { snippets = [], editorPreferences } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { height, width } = useWindowDimensions();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = snippets.length;

  const editorDimensions = {
    width: (83/100) * width,
    height: (70/100) * height,
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const currentSnippet = snippets[activeStep];
  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Breadcrumbs separator=" " 
          className={classes.breadcrumb} 
          aria-label="User Meta">
          <DescriptionIcon className={classes.icon} />
          <Typography variant="subtitle2" 
            color="inherit" 
            noWrap>
            {currentSnippet.name}
          </Typography>
          <PersonIcon className={classes.icon} />
          <Typography variant="subtitle2" 
            color="inherit" 
            noWrap>
            {currentSnippet.owner.username}
          </Typography>
          <CodeIcon className={classes.icon} />
          <Typography variant="subtitle2" 
            color="inherit" 
            noWrap>
            {currentSnippet.language}
          </Typography>
          <DateRangeIcon className={classes.icon} />
          <Typography variant="subtitle2" 
            color="inherit" 
            noWrap>
            Date created: {currentSnippet.created}
          </Typography>
          {!!currentSnippet.private 
            ? 
            <LockIcon className={classes.icon} />
            : 
            <PublicIcon className={classes.icon} />
          }
          <Typography variant="subtitle2" 
            color="inherit" 
            noWrap>
            {!!currentSnippet.private ? "Private" : "Public"}
          </Typography>
        </Breadcrumbs>
      </Paper>
        <AceEditor
          mode={currentSnippet.language}
          fontSize={editorPreferences.font}
          width={`${Number(editorDimensions.width).toString()}px`}
          height={`${Number(editorDimensions.height).toString()}px`}
          value={currentSnippet.code}
          theme={editorPreferences.theme}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            useWorker: false,
          }}
          readOnly={true}
        />
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

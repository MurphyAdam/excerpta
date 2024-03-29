import React, { useState, useEffect } from 'react';
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
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { config } from 'ace-builds';

languages.forEach(mode => {
config.setModuleUrl(
   `ace/mode/${mode}`,
   `https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-min-noconflict/mode-${mode}.js`
);});

themes.forEach(theme => {
config.setModuleUrl(
   `ace/theme/${theme}`,
   `https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-min-noconflict/theme-${theme}.js`
);});

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
  const [maxSteps, setMaxSteps] = useState(snippets.length);
  const [currentSnippet, setCurrentSnippet] = useState(snippets[activeStep]);

  useEffect(() => {
    // when snippets.length changes, we would want to push control to the first
    // item in the snippets array again. This makes sure we don't run into issues
    // such as index out of range. as maxSteps is defined by snippets.length;
    setActiveStep(prevActiveStep => 0);
    setMaxSteps(snippets.length)
  }, [snippets.length])

  useEffect(() => {
    setCurrentSnippet(snippets[activeStep]);
    // eslint-disable-next-line
  }, [activeStep])

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
            Date created: {formatDistanceToNow(new Date (Date.parse(currentSnippet.created)))} ago
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

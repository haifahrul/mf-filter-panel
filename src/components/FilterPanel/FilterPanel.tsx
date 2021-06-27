import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Drawer } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { IconCancel } from '../../icons';
// import ClearIcon from '@material-ui/icons/Clear';
import { IFilterPanelFormMeta, IFilterPanelFormMetaValue, IFilterPanelProps, IUpdateFormMeta } from './interfaces';
import InputMinMax from './InputMinMax/InputMinMax';
import DateRange from './DateRange/DateRange';
import FilterCheckbox from './Checkbox/Checkbox';
import { IDateRange } from './DateRange/interfaces';
import { IInputMinMax } from './InputMinMax/interfaces';
import { ICheckbox } from './Checkbox/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        fontFamily: 'Muli',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        marginBottom: 60,
        '& input': {
            fontSize: 12
        }
    },
    header: {
        padding: '3px 0 0 16px'
    },
    headerTitle: {
        fontSize: '16px',
        fontWeight: 'bold',        
        color: '#25282B'
    },
    footer: {
        position: 'fixed',
        bottom: 0
    },
    footerActions: {
        display: 'flex',
        justifyContent: 'center',
        padding: 16
    },
    listItemText: {
        fontSize: 14,
        color: '#25282B'
    },
    contentText: {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '12px',
        color: '#25282B'
    },
    resetButton: {
        backgroundColor: theme.palette.background.paper,
        height: 32,
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        color: '#52575C',
        textTransform: 'capitalize'
    },
    submitButton: {
        'backgroundColor': '#F0444C',
        'height': 32,
        'fontFamily': 'Muli',
        'fontStyle': 'normal',
        'fontWeight': 600,
        'fontSize': 14,
        'color': '#ffffff',
        'textTransform': 'capitalize',
        '&:hover': {
            backgroundColor: '#F0444C'
        },
        '&.Mui-disabled': {
            backgroundColor: '#FAC0C3',
            color: '#FFFFFF'
        }
    },
    buttonDisabled: {
        cursor: 'default',
        pointerEvents: 'none'
    },
    nested: {
        paddingLeft: '17px',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}));

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#25282B',
        },
        secondary: {
            main: '#f0444c'
        }
    },
});

const FilterPanel: React.FC<IFilterPanelProps> = (props: IFilterPanelProps) => {
    const classes = useStyles();
    const anchor = props.anchor ? props.anchor : 'right';
    const headerTitle = props?.headerTitle || 'Filter Panel';
    
    const [collapse, setCollapse] = React.useState<{[key: string]: boolean}>({});
    const [defaultState, setDefaultState]  = React.useState<{[key: string]: IFilterPanelFormMetaValue}>();
    const [state, setState] = React.useState<{[key: string]: IFilterPanelFormMetaValue}>(); // main state
    const [stateReady, setStateReady] = useState(false); 
    const [formMeta, setFormMeta] = React.useState<IFilterPanelFormMeta[]>(); // main state
    const [widthPanel, setWidthPanel] = useState(280)
    const [widthButton, setWidthButton] = useState(118)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

    // initial state
    useEffect(() => {
        let obj = {};
        let initStates = {};

        if (props.formMeta.length < 1) {
            console.error('Props Form Meta must be at least 1 arrat of object');
            return
        }

        props.formMeta.forEach((fm: IFilterPanelFormMeta) => {
            let value: any = null;
            let initState: any = null;

            switch (fm.type) {
                case 'dateRange':
                    value = {
                        start: (fm?.value as IDateRange)?.start || null,
                        end: (fm?.value as IDateRange)?.end || null
                    };
                    initState = { start: null, end: null };
                    break;
                case 'inputMinMax':
                    value = {
                        min: (fm?.value as IInputMinMax)?.min || '',
                        max: (fm?.value as IInputMinMax)?.max || ''
                    };
                    initState = { min: '', max: '' };
                    break;
                case 'checkbox':
                    if (!fm?.value) {
                        console.error('Component Filter List: Form Checkbox must be fill value');
                        return;
                    } else if ((fm?.value as ICheckbox[])?.length < 1) {
                        console.error('Component Filter List: Form Checkbox must be fill at least 1 value object or interface ICheckbox');
                        return;
                    }

                    value = fm?.value || []; // set default value from formMeta.value

                    // set default value with null values
                    if (fm?.value && (fm.value as ICheckbox[]).length > 0) {
                        initState = (fm.value as ICheckbox[]).map(item => {
                            return {
                                ...item,
                                checked: false
                            };
                        });
                    }
                    break;
                default:
                    console.error('Component Filter List: Form meta: key type is unknown');
                    break;
            }
            obj = { ...obj, [fm.field]: value }; 
            initStates = { ...initStates, [fm.field]: initState };
        });

        setState({ ...obj });
        setDefaultState({ ...initStates });
        setFormMeta(props.formMeta);

        if (props?.width) {
            setWidthPanel(props.width);
            setWidthButton(props.width - 162);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    // checking is state ready
    useEffect(() => {
        if (state) {
            setStateReady(true);
            validationSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const validationSubmit = () => {
        let counter = 0;

        formMeta.forEach((fm) => {
            switch (fm.type) {
                case 'dateRange':
                    if (((fm?.value as IDateRange)?.end) && ((fm?.value as IDateRange)?.start)) {
                        counter++;
                    }
                    break;
                case 'inputMinMax':
                    if (((fm?.value as IInputMinMax)?.min) && ((fm?.value as IInputMinMax)?.max)) {
                        counter++;
                    }
                    break;
                case 'checkbox':
                    if (fm?.value && (fm.value as ICheckbox[]).length > 0) {
                        (fm.value as ICheckbox[]).forEach(item => {
                            if (item.checked) { counter++; }
                        });
                    }
                    break;
            }

        });

        if (counter > 0) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }

    };

    const onCollapseClick = (field: string) => () => {
        setCollapse({ ...collapse, [field]: !collapse[field]});
    };

    const onClickReset = () => {
        const fm: IFilterPanelFormMeta[] = formMeta.map(obj => {
            const meta: IFilterPanelFormMeta = {
                ...obj,
                value: defaultState[obj.field]
            };
            return meta;
        });

        setFormMeta(fm)
        setState({ ...defaultState });
        setIsSubmitDisabled(true);
    };

    const onClickSubmit = (event: React.BaseSyntheticEvent) => {
        props.onSubmit({ value: state, formMeta });
        event.preventDefault();
    };

    const onChangeInputMaxMin = (field: string, value: IInputMinMax) => {
        const newState = { 
            ...state[field], 
            ...value
        };

        setState({ 
            ...state,
            [field]: newState
        });

        updateFormMeta({ type: 'inputMinMax', field, value: {
            min: newState.min,
            max: newState.max
        }});

        props.onChange({
            field,
            value: newState
        });
    };

    const onChangeDateRange = (field: string, value: IDateRange) => {
        const newState = { 
            ...state[field], 
            ...value
        };

        setState({ 
            ...state,
            [field]: newState
        });

        updateFormMeta({ type: 'dateRange', field, value: {
            start: newState.start,
            end: newState.end
        }});

        props.onChange({
            field,
            value: newState
        });
    };

    const onChangeCheckbox = (field: string, value: ICheckbox[]) => {
        const newState = { 
            ...state[field], 
            ...value
        };

        setState({ 
            ...state,
            [field]: value
        });

        updateFormMeta({ type: 'checkbox', field, value });

        props.onChange({
            field,
            value: newState
        });
    };
    
    const updateFormMeta = (items: IUpdateFormMeta) => {
        const fm = formMeta.map(item => {
            let value = item.value;
            if (items.field === item.field) {
                value = items.value;
            }

            return {
                ...item,
                value
            }
        });

        setFormMeta(fm);
    }

    const layout = (prop: IFilterPanelFormMeta, index: number) => {
        return (
            <React.Fragment key={index}>
                <ListItem button onClick={onCollapseClick(prop.field)}>
                    <ListItemText classes={{primary: classes.listItemText}} primary={prop.title} />
                    {collapse[prop.field] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={collapse[prop.field]} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <ListItem button className={classes.nested}>
                            
                            {
                                prop.type === 'dateRange' && 
                                    <DateRange 
                                        title={prop.title}
                                        field={prop.field}
                                        value={(state[prop.field] as IDateRange)}
                                        options={prop.options?.dateRange}
                                        onChange={onChangeDateRange}
                                    />
                            }

                            {
                                prop.type === 'inputMinMax' && 
                                    <InputMinMax 
                                        title={prop.title}
                                        field={prop.field}
                                        value={(state[prop.field] as IInputMinMax)}
                                        options={prop.options?.inputMinMax}
                                        onChange={onChangeInputMaxMin}
                                    />
                            }

                            {
                                prop.type === 'checkbox' && 
                                    <FilterCheckbox
                                        title={prop.title}
                                        field={prop.field}
                                        value={(state[prop.field] as ICheckbox[])}
                                        options={prop.options?.checkbox}
                                        onChange={onChangeCheckbox}
                                        width={widthPanel}
                                    />
                            }

                        </ListItem>
                    </List>
                </Collapse>
            </React.Fragment>
        );
    };

    const list = () => (
        <form
            className={classes.root}
            style={{
                width: widthPanel,
                minWidth: widthPanel,
                maxWidth: widthPanel
            }}
            noValidate 
            autoComplete='off'
            role='presentation'
            onSubmit={onClickSubmit}
        >
            <List>
                <ListItem className={classes.header}>
                    <ListItemText classes={{ primary: classes.headerTitle }} primary={headerTitle} />
                    <ListItemSecondaryAction>
                        <IconCancel onClick={props.onClose} width='18px' fill='black' />
                        {/* <ClearIcon onClick={props.onClose} fontSize="large"/> */}
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            
            <Divider />

            <List>
                {props.formMeta.map((p: IFilterPanelFormMeta, i: number) => layout(p, i))}
            </List>

            <Card className={classes.footer}>
                <Divider />
                <CardActions className={classes.footerActions} style={{width: widthPanel}}>
                    <Button 
                        type='reset'
                        variant='contained'
                        size='medium' 
                        className={classes.resetButton} 
                        onClick={onClickReset}
                        style={{width: widthButton}}
                    > 
                        Reset
                    </Button>
                    <Button 
                        type='submit' 
                        variant='contained' 
                        size='medium' 
                        className={classes.submitButton} 
                        onClick={onClickSubmit}
                        style={{width: widthButton}}
                        disabled={isSubmitDisabled}
                    >
                        Apply
                    </Button>
                </CardActions>
            </Card>
        </form>
    );

    return (
        <ThemeProvider theme={muiTheme}>
            {stateReady &&
                <React.Fragment>
                    <Drawer 
                        anchor={anchor}
                        open={props.open}
                        onClose={props.onClose}
                    >
                        {list()}
                    </Drawer>
                </React.Fragment>
            }
        </ThemeProvider>
    );
};

export default FilterPanel;

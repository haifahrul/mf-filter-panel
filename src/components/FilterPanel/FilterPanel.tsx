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
import { IFilterPanelFormMeta, IFilterPanelProps } from './interfaces';
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
        bottom: 0,
        width: '100%'
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
        }
    },
    buttonDisabled: {
        cursor: 'default',
        pointerEvents: 'none'
    },
    nested: {
        paddingLeft: '17px'
    }
}));

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#cacaca',
        },
        secondary: {
            main: '#f0444c'
        }
    },
});

const FilterPanel: React.FC<IFilterPanelProps> = (props: IFilterPanelProps) => {
    const classes = useStyles();
    const anchor = props.anchor ? props.anchor : 'right';
    
    const [collapse, setCollapse] = React.useState<{[key: string]: boolean}>({});
    const [defaultState, setDefaultState]  = React.useState<{[key: string]: any}>();
    const [state, setState] = React.useState<{[key: string]: any}>(); // main state
    const [stateReady, setStateReady] = useState(false); 
    const [widthPanel, setWidthPanel] = useState(280)
    const [widthButton, setWidthButton] = useState(118)

    // initial state
    useEffect(() => {
        let obj = {};
        let initStates = {};

        props.formMeta.forEach((p: IFilterPanelFormMeta) => {
            let value: any = null;
            let initState: any = null;

            switch (p.type) {
                case 'dateRange':
                    value = {
                        start: (p?.value as IDateRange)?.start || null,
                        end: (p?.value as IDateRange)?.end || null
                    };
                    initState = { start: null, end: null };
                    break;
                case 'inputMinMax':
                    value = {
                        min: (p?.value as IInputMinMax)?.min || '',
                        max: (p?.value as IInputMinMax)?.max || ''
                    };
                    initState = { min: '', max: '' };
                    break;
                case 'checkbox':
                    if (!p?.value) {
                        console.error('Component Filter List: Form Checkbox must be fill value');
                        break;
                    } else if ((p?.value as ICheckbox[])?.length < 1) {
                        console.error('Component Filter List: Form Checkbox must be fill at least 1 value object or interface ICheckbox');
                        break;
                    }

                    value = p?.value || []; 
                    initState = (p?.value as ICheckbox[]).map(item => {
                        return {
                            ...item,
                            checked: false
                        };
                    });
                    break;
                default:
                    console.error('Component Filter List: Form meta: key type is unknown');
                    break;
            }
            obj = { ...obj, [p.field]: value }; 
            initStates = { ...initStates, [p.field]: initState };
        });

        setState({ ...obj });
        setDefaultState({ ...initStates });

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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCollapseClick = (field: string) => () => {
        setCollapse({ ...collapse, [field]: !collapse[field]});
    };

    const onClickReset = () => {
        setState({ ...defaultState });
    };

    const onClickSubmit = (event: React.BaseSyntheticEvent) => {
        props.onSubmit({ ...state });
        event.preventDefault();
    };

    const onChangeInputMaxMin = (field: string, values: object) => {
        const newState = { 
            ...state[field], 
            ...values[field]
        };

        setState({ 
            ...state,
            [field]: newState
        });

        props.onChange({
            field,
            values: newState
        });
    };

    const onChangeDateRange = (field: string, values: object) => {
        const newState = { 
            ...state[field], 
            ...values[field]
        };

        setState({ 
            ...state,
            [field]: newState
        });

        props.onChange({
            field,
            values: newState
        });
    };

    const onChangeCheckbox = (field: string, values: object) => {
        setState({ 
            ...state,
            [field]: values[field]
        });

        props.onChange({
            field,
            values: values[field]
        });
    };

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
                                        value={state[prop.field]}
                                        options={prop.options?.dateRange}
                                        onChange={onChangeDateRange}
                                    />
                            }

                            {
                                prop.type === 'inputMinMax' && 
                                    <InputMinMax 
                                        title={prop.title}
                                        field={prop.field}
                                        value={state[prop.field]}
                                        options={prop.options?.inputMinMax}
                                        onChange={onChangeInputMaxMin}
                                    />
                            }

                            {
                                prop.type === 'checkbox' && 
                                    <FilterCheckbox
                                        title={prop.title}
                                        field={prop.field}
                                        value={state[prop.field]}
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
                    <ListItemText classes={{ primary: classes.headerTitle }} primary='Filter List' />
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

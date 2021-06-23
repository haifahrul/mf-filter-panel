import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';

import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Drawer } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { IconCancel } from '../../icons';
import { IFilterPanelFormMeta, IFilterPanelProps } from './interfaces';
import InputMinMax from './InputMinMax/InputMinMax';
import DateRange from './DateRange/DateRange';
import FilterCheckbox from './Checkbox/Checkbox';
import { IDateRange } from './DateRange/interfaces';
import { IInputMinMax } from './InputMinMax/interfaces';
import { ICheckbox } from './Checkbox/interfaces';

const FilterPanel: React.FC<IFilterPanelProps> = (props: IFilterPanelProps) => {
    const classes = useStyles();
    const anchor = props.anchor ? props.anchor : 'right';
    
    const [collapse, setCollapse] = React.useState<{[key: string]: boolean}>({});
    const [defaultState, setDefaultState]  = React.useState<{[key: string]: any}>();
    const [state, setState] = React.useState<{[key: string]: any}>(); // main state
    const [stateReady, setStateReady] = useState(false) 

    // initial state
    useEffect(() => {
        let obj = {};
        let initStates = {};

        props.formMeta.forEach((p: IFilterPanelFormMeta) => {
            let value: any = null;
            let initState: any = null

            switch (p.type) {
                case 'dateRange':
                    value = {
                        start: (p?.value as IDateRange)?.start || null,
                        end: (p?.value as IDateRange)?.end || null
                    }
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

                    value = p?.value || [] 
                    initState = p?.value || []
                    break;
                default:
                    console.error('Component Filter List: Form meta: key type is unknown');
                    break;
            }
            obj = { ...obj, [p.field]: value } 
            initStates = { ...initStates, [p.field]: initState }
        });

        setState({ ...obj });
        setDefaultState({ ...initStates })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    // checking is state ready
    useEffect(() => {
        if (state) {
            setStateReady(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const onCollapseClick = (field: string) => () => {
        setCollapse({ ...collapse, [field]: !collapse[field]});
    };

    const onClickReset = () => {
        setState({ ...defaultState })
    };

    const onClickSubmit = (event: React.BaseSyntheticEvent) => {
        props.onSubmit({ ...state });
        event.preventDefault();
    };

    const onChangeInputMaxMin = (field: string, values: object) => {
        const newState = { 
            ...state[field], 
            ...values[field]
        }

        setState({ 
            ...state,
            [field]: newState
        });

        props.onChange({
            field,
            values: newState
        })
    };

    const onChangeDateRange = (field: string, values: object) => {
        const newState = { 
            ...state[field], 
            ...values[field]
        }

        setState({ 
            ...state,
            [field]: newState
        });

        props.onChange({
            field,
            values: newState
        })
    };

    const onChangeCheckbox = (field: string, values: object) => {
        setState({ 
            ...state,
            [field]: values[field]
        });

        props.onChange({
            field,
            values: values[field]
        })
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
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            
            <Divider />

            <List>
                {props.formMeta.map((p: IFilterPanelFormMeta, i: number) => layout(p, i))}
            </List>

            <Card className={classes.footer}>
                <Divider />
                <CardActions className={classes.footerActions}>
                    <Button type='reset' variant='contained' size='medium' className={classes.resetButton} onClick={onClickReset}> 
                        Reset
                    </Button>
                    <Button type='submit' variant='contained' size='medium' className={classes.submitButton} onClick={onClickSubmit}>
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
                        className={classes.root}
                    >
                        {list()}
                    </Drawer>
                </React.Fragment>
            }
        </ThemeProvider>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        fontFamily: 'Muli',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        textTransform: 'capitalize',
        width: 280,
        minWidth: 280,
        maxWidth: 280,
        marginBottom: 60
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
        width: 280,
        padding: 12
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
        width: 118,
        minWidth: 118,
        maxWidth: 118,
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
        'width': 118,
        'minWidth': 118,
        'maxWidth': 118,
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
        // opacity: 30%;
        cursor: 'default',
        pointerEvents: 'none'
    },
    nested: {
        paddingLeft: theme.spacing(2)
    }
}));

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#f0444c'
        }
    },
});

export default FilterPanel;

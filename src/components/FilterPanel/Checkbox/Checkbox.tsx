/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ICheckbox, ICheckboxProps } from './interfaces';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        formControlLabel: {
            alignItems: 'flex-start'
        },
        label: {
            fontSize: 12,
            color: '#52575C',
            verticalAlign: 'bottom'
        },
        checkbox: {
            paddingTop: 2
        }
    })
);

const FilterCheckbox: React.FC<ICheckboxProps> = (props: ICheckboxProps) => {
    const classes = useStyles();
    const lengthValue = props?.value?.length || 0;
    const [limit, setLimit] = useState<number>(lengthValue);
    const width = (props.width/2)-10;

    useEffect(() => {
        if (props?.options?.column > 1) {
            if (lengthValue % 2 === 0) {
                setLimit(lengthValue/2);
            } else {
                setLimit((lengthValue+1)/2);
            }
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const items = props.value.map(item => {
            if (item.name === event.target.name) {
                item = {
                    ...item,
                    checked: event.target.checked
                };
            }
            return item
        });

        props.onChange(props.field, items);
    };

    const layoutCheckbox = (item: ICheckbox, index: number) => {
        return (
            <React.Fragment key={index}>
                <FormControlLabel
                    control={
                        <Checkbox 
                            checked={item.checked} 
                            onChange={handleChange}
                            name={item.name}
                            className={classes.checkbox}
                        />
                    }
                    label={item.label}
                    className={classes.formControlLabel}
                    classes={{
                        label: classes.label,
                    }}
                />
            </React.Fragment>
        )
    };

    const layoutFormControl = (index: number, limit: number) => {
        return (
            <React.Fragment key={index}>
                <FormControl component='fieldset' 
                    style={{width}}
                    // className={classes.formControl}
                >

                    {
                        props?.options?.formLabel &&
                            <FormLabel component='legend'>{props?.options?.formLabel}</FormLabel>
                    }

                    <FormGroup>
                        {
                            props?.value?.length > 0 && props?.value.map((p: ICheckbox, i: number) => {
                                if (index === 1 && i < limit) {
                                    return (
                                        layoutCheckbox(p, i)
                                    )
                                } else if (index === 2 && i >= limit) {
                                    return (
                                        layoutCheckbox(p, i)
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </FormGroup>

                    {
                        props?.options?.formLabel &&
                            <FormHelperText>{props?.options?.formText}</FormHelperText>
                    }
                    
                </FormControl>
            </React.Fragment>
        )
    }

    return (
        <div className={classes.root}>
            {
                [1, 2].map((p: number) => layoutFormControl(p, limit))
            }
        </div>
    );
};

export default FilterCheckbox;

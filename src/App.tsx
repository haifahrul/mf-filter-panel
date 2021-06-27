import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import {
	FilterPanel,
	IFilterPanelFormMeta,
	IFilterPanelOnChange,
	IFilterPanelOnSubmit
} from './components/FilterPanel';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.scss';
import moment from 'moment';

function App() {
	const formFilter: IFilterPanelFormMeta[] = [
		{
			title: 'Date Inline with options min date & max date',
			type: 'dateRange',
			field: 'dateInline',
			value: {
				start: '2021-06-20',
				end: moment().format('YYYY-MM-DD'),
			},
			options: {
				dateRange: {
					variant: 'inline',
					minDate: moment().subtract(5, 'days').format('YYYY-MM-DD'),
					maxDate: moment().add(5, 'days').format('YYYY-MM-DD')
				},
			},
		},
		{
			title: 'Date Modal with default options',
			type: 'dateRange',
			field: 'dateModal',
		},
		{
			title: 'Input Amount 1',
			type: 'inputMinMax',
			field: 'amountRange1',
			value: {
				min: 1000,
				max: 2000,
			},
			options: {
				inputMinMax: {
					adornment: {
						label: 'IDR',
						position: 'start',
					},
				},
			},
		},
		{
			title: 'Input Amount 2',
			type: 'inputMinMax',
			field: 'amountRange2',
			options: {
				inputMinMax: {
					adornment: {
						label: 'USD',
						position: 'end',
					},
				},
			},
		},
		{
			title: 'Checkbox 1 column',
			type: 'checkbox',
			field: 'checkboxType1',
			value: [
				{ label: 'Opt 1', name: 'checkboxType11', value: '1', checked: true },
				{ label: 'Opt 2', name: 'checkboxType12', value: '2', checked: false },
				{ label: 'Opt 3', name: 'checkboxType13', value: '3', checked: true }
			]
		},
		{
			title: 'Checkbox 2 column',
			type: 'checkbox',
			field: 'checkboxType2',
			value: [
				{ label: 'Opt 1', name: 'checkboxType21', value: '1', checked: false },
				{ label: 'Opt 2', name: 'checkboxType22', value: '2', checked: false },
				{ label: 'Opt 3', name: 'checkboxType23', value: '3', checked: false },
				{ label: 'Opt 4', name: 'checkboxType24', value: '4', checked: false },
				{ label: 'Opt 5', name: 'checkboxType25', value: '5', checked: false },
			],
			options: {
				checkbox: {
					column: 2
				}
			}
		}
	];

	const [openFilterList, setOpenFilterList] = React.useState(true);

	const handleOpenFilterList = () => {
		setOpenFilterList(true);
	};

	const handleCloseFilterList = () => {
		setOpenFilterList(false);
	};

	const handleSubmitFilterList = (event: IFilterPanelOnSubmit) => {
		console.log('handleSubmitFilterList:', event);
	};

	const handleChangeFilterList = (event: IFilterPanelOnChange) => {
		console.log('handleChangeFilterList:', event);
	};

	const filterListModalRef = useRef<HTMLDivElement>(null);

	return (
		<div className={'react-payment-status-container'}>
			<ThemeProvider theme={muiTheme}>
				<Button size='large' variant='contained' onClick={handleOpenFilterList}>
					Filter List
				</Button>

				<div ref={filterListModalRef}>
					<FilterPanel
						open={openFilterList}
						formMeta={formFilter}
						onClose={handleCloseFilterList}
						onSubmit={handleSubmitFilterList}
						onChange={handleChangeFilterList}
						width={380}
					/>
				</div>
			</ThemeProvider>
		</div>
	);
}

// @ts-ignore
const muiTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#ffffff',
		},
		secondary: {
			main: '#f0444c',
		},
	},
});

export default App;

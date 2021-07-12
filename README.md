# Component React Filter Panel

Simple to create form filter with just create an array object. DRY

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[<img src="https://raw.githubusercontent.com/haifahrul/mf-filter-panel/main/lighthouse.png">](https://raw.githubusercontent.com/haifahrul/mf-filter-panel/main/lighthouse.png)

## Usage
You can see code at file `App.tsx` for more detail.


## Component API

### FilterPanel Props

| Name        	| Type                   	| Default      	| Description                                                      	        |
|-------------	|------------------------	|--------------	|------------------------------------------------------------------	        |
| anchor      	| left \| right          	| right        	| position of drawer                                               	        |
| headerTitle 	| string                 	| Filter Panel 	|                                                                  	        |
| width       	| number                 	| 280          	| max width 380 min width 280                                      	        |
| open *      	| boolean                	|              	| If true panel will show else panel will hidden                   	        |
| formMeta *  	| IFilterPanelFormMeta[] 	|              	| Array object of form                                             	        |
| onClose *   	| void                   	|              	| Func to close panel via Dismiss (X) icon on top right            	        |
| onReset   	| void   	                |              	|                                                                 	        |
| onSubmit *  	| IFilterPanelOnSubmit   	|              	| Func callback contains value of filter, formMeta & query filled value 	|
| onChange    	| IFilterPanelOnChange   	|              	| Func callback on change on form                                  	        |

Note: * is required

### Props of interface IFilterPanelFormMeta

There are 3 types of filter:

1. Date Range
2. Input Min Max
3. Checkbox

| Name    	| Type                                      	| Default 	| Description                            	|
|---------	|-------------------------------------------	|---------	|----------------------------------------	|
| Title * 	| string                                    	|         	| Title of Filter                        	|
| Type *  	| TFilterType                               	|         	| `dateRange`, `checkbox`, `inputMinMax` 	|
| Field * 	| string                                    	|         	|                                        	|
| Value   	| IDateRange \| IInputMinMax \| ICheckbox[] 	|         	| To set default value of filter         	|
| Options 	| IFilterPanelOptions                       	|         	|                                        	|

#### 1. Date Range

#### Value
| Name       	| Type                   	| Default 	| Description                                                      	|
|------------	|------------------------	|---------	|------------------------------------------------------------------	|
| start      	| string                 	|         	| Allow format date `MM-DD-YYYY`, `YYYY-MM-DD` and `MM/DD/YYYY`    	|
| end        	| string                 	|         	| Allow format date `MM-DD-YYYY`, `YYYY-MM-DD` and `MM/DD/YYYY`    	|

#### Options 

We use moment.js for parsed date. Maybe we'll migrate to use dayjs for smaller size file.

| Name             	| Type                         	| Default              	| Description                                                      	|
|------------------	|------------------------------	|----------------------	|------------------------------------------------------------------	|
| variant          	| TFilterDateRangeVariant      	| dialog               	| Allow variant `inline` and `dialog`                              	|
| inputVariant     	| TFilterDateRangeInputVariant 	| outlined             	| Allow inputVariant `outlined`, `standard` and `filled`           	|
| format           	| string                       	| DD/MM/YYYY           	| Allow format date `MM-DD-YYYY`, `YYYY-MM-DD` and `MM/DD/YYYY`    	|
| outputFormatDate 	| string                       	| YYYY-MM-DD           	|                                                                  	|
| minDate          	| string                       	| moment('1900-01-01') 	|                                                                  	|
| maxDate          	| string                       	| now() + 1 day        	|                                                                  	|


#### 2. Input Min Max

#### Value

| Name             	| Type                 	| Default              	| Description                                                      	|
|------------------	|----------------------	|----------------------	|------------------------------------------------------------------	|
| min              	| number               	|                      	|                                                                  	|
| max              	| number               	|                      	|                                                                  	|

#### Options

| Name             	| Type                 	| Default              	| Description                                                                                                                                 	|
|------------------	|----------------------	|----------------------	|---------------------------------------------------------------------------------------------------------------------------------------------	|
| adornment        	| IInputAdornmentProps 	|                      	| ``` { label: string;      position: 'start' \| 'end'; }``` <br><br>label: for text.<br>position: for position of the label. `start` or `end`. 	|
| variant          	| number               	| outlined             	| `standard`, `outlined` and `filled`             

#### 3. Checkbox

#### Value

| Name       	| Type                 	| Default       	| Description                                                      	|
|------------	|----------------------	|---------------	|------------------------------------------------------------------	|
| label *    	| string               	|               	|                                                                  	|
| name *     	| string               	|               	|                                                                  	|
| value *    	| string \| number     	|               	|                                                                  	|
| string *   	| boolean              	|               	|                                                                  	|
#### Options

| Name       	| Type                 	| Default       	| Description                                                      	|
|------------	|----------------------	|---------------	|------------------------------------------------------------------	|
| column     	| 1 \| 2               	|               	|                                                                  	|
| formLabel  	| string               	|               	| Todo: CSS and the position not pretty                            	|
| formText   	| string               	|               	| Todo: CSS and the position not pretty                            	|

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

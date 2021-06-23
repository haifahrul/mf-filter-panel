import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import {
  IFilterPanelFormMeta,
  FilterPanel,
  IFilterPanelOnChange,
} from "./components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import './App.css';
import "./App.scss";

function App() {
  const formFilter: IFilterPanelFormMeta[] = [
    {
      title: "Order Date",
      type: "dateRange",
      field: "orderDate",
      value: {
        start: "2021-06-20",
        end: "2021-06-22",
      },
      options: {
        dateRange: {
          variant: "inline",
          minDate: "2021-06-20",
          maxDate: "2021-06-28",
          inputVariant: "standard",
        },
      },
    },
    {
      title: "Payment Due Date",
      type: "dateRange",
      field: "paymentDueDate",
    },
    {
      title: "Payment Date",
      type: "dateRange",
      field: "paymentDate",
    },
    {
      title: "Store Order Total",
      type: "inputMinMax",
      field: "storeOrderTotal",
      value: {
        min: 123,
        max: 456,
      },
      options: {
        inputMinMax: {
          adornment: {
            label: "Rp",
            position: "start",
          },
        },
      },
    },
    {
      title: "Supplier Delivered Total",
      type: "inputMinMax",
      field: "supplierDeliveredTotal",
      options: {
        inputMinMax: {
          adornment: {
            label: "Rp",
            position: "start",
          },
        },
      },
    },
    {
      title: "Store Payment Total",
      type: "inputMinMax",
      field: "storePaymentTotal",
      options: {
        inputMinMax: {
          adornment: {
            label: "Rp",
            position: "start",
          },
        },
      },
    },
    {
      title: "Payment Type",
      type: "checkbox",
      field: "paymentType",
    },
    {
      title: "Pay Later Type",
      type: "checkbox",
      field: "payLaterType",
    },
    {
      title: "Order Status",
      type: "checkbox",
      field: "orderStatus",
    },
    {
      title: "Payment Status",
      type: "checkbox",
      field: "paymentStatus",
    },
  ];

  const [openFilterList, setOpenFilterList] = React.useState(true);

  const handleOpenFilterList = () => {
    setOpenFilterList(true);
  };

  const handleCloseFilterList = () => {
    setOpenFilterList(false);
  };

  //   const classes = useStyles();

  const handleSubmitFilterList = (event: any) => {
    console.log("handleSubmitFilterList:", event);
  };

  const handleChangeFilterList = (event: IFilterPanelOnChange) => {
    console.log("handleChangeFilterList:", event);
  };

  const filterListModalRef = useRef<HTMLDivElement>(null);

  return (
    <div className={"react-payment-status-container"}>
      <ThemeProvider theme={theme}>
        <Button size="large" variant="contained" onClick={handleOpenFilterList}>
          Filter List
        </Button>

        <div ref={filterListModalRef}>
          <FilterPanel
            open={openFilterList}
            formMeta={formFilter}
            onClose={handleCloseFilterList}
            onSubmit={handleSubmitFilterList}
            onChange={handleChangeFilterList}
          />
        </div>
      </ThemeProvider>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit ok <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

// tslint:disable-next-line:no-shadowed-variable
// const useStyles = makeStyles((theme: Theme) => ({
//   container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//   },
//   textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: 200,
//   },
//   whiteButton: {
//       backgroundColor: theme.palette.background.paper
//   },
//   greyButton: {
//       'backgroundColor': '#52575C',
//       'color': '#FFFFFF',
//       '&:hover': {
//           backgroundColor: '#52575C',
//           color: '#FFFFFF',
//       },
//   },
//   table: {
//       minWidth: 650,
//   },
//   root: {
//       flexGrow: 1,
//       backgroundColor: theme.palette.background.paper,
//   },
//   rootsearch: {
//       padding: '2px 4px',
//       display: 'flex',
//       width: 389,
//   },
//   input: {
//       marginLeft: theme.spacing(1),
//       flex: 1,
//   },
//   widthFull: {
//       width: '100%',
//       fontSize: '1em'
//   },
//   iconButton: {
//       padding: 10,
//   },
//   divider: {
//       height: 28,
//       margin: 4,
//   },
// }));

// @ts-ignore
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#f0444c",
    },
  },
});

export default App;

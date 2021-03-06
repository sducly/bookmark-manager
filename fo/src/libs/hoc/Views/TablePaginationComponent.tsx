import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import * as React from "react";
import Styles from "../../../components/layout/styles";

interface IPaginationProps {
  classes: any,
  count: number,
  page: number,
  rowsPerPage: number,
  theme: any,
  onChangePage: (event: any, page: number) => void
}

/**
 * Table pagination component
 */
class TablePaginationComponent extends React.Component<IPaginationProps, {}> {

  public render() {
    const { classes, count, page, rowsPerPage } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }

  /**
   * Handle when click on first page button
   */
  private handleFirstPageButtonClick = (event: any) => {
    this.props.onChangePage(event, 1);
  };

  /**
   * Handle when click on back button
   */
  private handleBackButtonClick = (event: any) => {
    this.props.onChangePage(event, this.props.page);
  };

  /**
   * Handle when click on next button
   */
  private handleNextButtonClick = (event: any) => {
    this.props.onChangePage(event, this.props.page + 2);
  };

  /**
   * Handle when click on last page button
   */
  private handleLastPageButtonClick = (event: any) => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage)),
    );
  };

}

export default withStyles(Styles as any)(TablePaginationComponent);
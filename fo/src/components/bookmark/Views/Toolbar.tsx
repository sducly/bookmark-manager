import { Button, Grid, withStyles } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import { InputWidget, SelectWidget } from "../../hoc";
import Styles from "../../layout/styles";
import { ComponentsPathEnum } from "../../workflow";

const AddLink = (props: {}) => {
    const url = generatePath(ComponentsPathEnum.BOOKMARK_FORM, {
        id: 0
    });
    return <Link to={url} {...props} />
}

class BookmarkToolbar extends React.Component<any, {}> {
    public render() {
        const { classes, type, onChange } = this.props

        return <Grid
            container={true}
            className={classes.tableToolbar}
            spacing={32}
            alignItems={"flex-end"}
            direction="row"
            justify="flex-end">
            <Grid item={true} xs={12} sm={3}>
                <InputWidget name="title" label="Titre" />
            </Grid>

            <Grid item={true} xs={12} sm={3}>
                <SelectWidget onChange={onChange} key="toolbar-bookmark-type" label="Type" value={(type) ? type : ""} name="type" options={[
                    { label: "", value: null },
                    { label: "Picture", value: "picture" },
                    { label: "Videos", value: "video" },
                ]} />
            </Grid>
            <Grid item={true}>
                <Button
                    component={AddLink}
                    variant="contained"
                    size="small"
                    color="secondary"
                    mini={true}
                    className={classes.button}
                    style={{
                        height: "100%"
                    }}>
                    <SaveIcon className={classes.leftIcon} />
                    Add bookmark
      </Button>
            </Grid>
        </Grid>
    }
}

export default withStyles(Styles as any)(BookmarkToolbar);
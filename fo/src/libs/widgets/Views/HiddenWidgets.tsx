import * as React from "react";

/**
 * Hidden Widget
 */
export default ({ name, value }: { name: string, value: any }) => {
    return <input
        type="hidden"
        defaultValue={value}
        name={name}
    />
}
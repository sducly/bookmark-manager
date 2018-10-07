import * as React from "react";

export default ({ name, value }: { name: string, value: any }) => {
    return <input
        type="hidden"
        defaultValue={value}
        name={name}
    />
}
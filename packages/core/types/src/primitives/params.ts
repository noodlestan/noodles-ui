export type Value = string | boolean | number | undefined;

export type Params = {
    [key: string]: Params | Value;
};

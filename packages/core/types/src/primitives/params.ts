export type Value = string | boolean | number | undefined;

export type ExtendParams = {
    [key: string]: ExtendParams | Value;
};

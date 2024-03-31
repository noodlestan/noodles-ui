export type ResourceContext<T> = {
    key: string;
    resource: T;
    public: boolean;
    consumes: Set<string>;
    consumers: Set<string>;
};

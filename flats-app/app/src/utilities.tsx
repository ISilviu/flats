const extractSearchParam = (searchParams: URLSearchParams, key: string, defaultValue: string) => {
    let parameterValue = defaultValue;
    if (searchParams.has(key)) {
        parameterValue = searchParams.get(key) ?? defaultValue;
        if (parameterValue === '') {
            parameterValue = defaultValue;
        }
    }
    return parameterValue;
};

const parseIntWithDefault = (number: string, defaultValue: number) => {
    const parsed = parseInt(number);
    return Number.isNaN(parsed) ? defaultValue : parsed;
};

export { extractSearchParam, parseIntWithDefault };
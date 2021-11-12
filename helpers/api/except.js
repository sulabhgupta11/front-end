export { except };

function except(obj, key) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}
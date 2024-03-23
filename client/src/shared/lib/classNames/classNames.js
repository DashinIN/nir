
export const classNames = (cls, mods, additional) => [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, value]) => Boolean(value))
        .map(([className]) => className),
].join(' ');
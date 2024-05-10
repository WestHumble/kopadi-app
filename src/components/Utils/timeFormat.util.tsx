export const getFormattedTime = (hours: number, minutes: number) => {
    const timeComponents = [hours, minutes];
    return timeComponents
        .map(component => {
            const pad = (component < 10) ? '0' : '';
            return pad + component;
        })
        .join(':');
}
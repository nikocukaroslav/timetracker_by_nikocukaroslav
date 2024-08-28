export function formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function convertToLocalISO(timestamp: number): string {
    const date = new Date(timestamp);
    date.setMinutes(date.getMinutes() - new Date().getTimezoneOffset());

    const ISO = date.toISOString().slice(0, -5);

    return ISO;
}

export function convertDateToISODate(dateValue: Date): string {
    const date = new Date(dateValue);
    date.setMinutes(date.getMinutes() - new Date().getTimezoneOffset());

    const ISODate = date.toISOString().split('T')[0];

    return ISODate;
}

const dateConverter = (date: Date | number | string, format?: string) => {
    const dateValue = new Date(date);

    let options: Intl.DateTimeFormatOptions;

    switch (format) {
        case "full":
            options = {
                day: "2-digit",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            };
            break;
        case "MMMM yyyy":
            options = {
                month: "long",
                year: "numeric",
                hour12: false,
            };
            break;
        case "full-day":
            options = {
                month: "long",
                day: "2-digit",
                hour12: false,
            };
            break;
        default:
            options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour12: false,
            };
    }

    return new Intl.DateTimeFormat("en-US", options).format(dateValue);
};

export const convertTime = (time: string | number, format?: string) => {
    const dateValue = typeof time === "string"
        ? new Date("1970-01-01T" + time)
        : new Date(time);

    let options: Intl.DateTimeFormatOptions;

    switch (format) {
        case "hh:mm":
            options = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            };
            break;
        default:
            options = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            };
    }

    return new Intl.DateTimeFormat("en-US", options).format(dateValue);
};

export default dateConverter;
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

export function convertTimeToISOTime(timeValue: string): string {
    const [hours, minutes, seconds] = timeValue.split(':');

    const ISOTime = `${hours || "00"}:${minutes || "00"}:${seconds || "00"}`;

    return ISOTime;
}

const dateFormatConverter = (date: Date | number | string, format?: string) => {
    const dateValue = new Date(date);

    let options: Intl.DateTimeFormatOptions;

    switch (format) {
        case "full":
            options = {
                day: "2-digit",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
            };
            break;
        case "time":
            options = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            };
            break;
        case "MMMM yyyy":
            options = {
                month: "long",
                year: "numeric",
            };
            break;
        case "hh:mm":
            options = {
                hour: "2-digit",
                minute: "2-digit",
            };
            break;
        case "full-day":
            options = {
                month: "long",
                day: "2-digit",
            };
            break;
        default:
            options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            };
    }

    return new Intl.DateTimeFormat("en-US", options).format(dateValue);
};

export default dateFormatConverter;
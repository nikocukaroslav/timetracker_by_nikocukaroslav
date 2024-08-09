export function formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const dateFormatConverter = (date: number | string, format?: string) => {
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
export function calculateTotalTime(start: Date, end: Date) {
    if (!start || !end) return "00:00";

    const startDate = Number(new Date(start));
    const endDate = Number(new Date(end));

    const diffMs: number = endDate - startDate;

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    const formattedHours = String(diffHours).padStart(2, '0');
    const formattedMinutes = String(diffMinutes).padStart(2, '0');

    if (Number(formattedMinutes) <= 0) return "< 1"

    return `${formattedHours}:${formattedMinutes}`;
}

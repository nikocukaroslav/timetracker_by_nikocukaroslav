export function getCalendarBounds(year: number, month: number) {
    const firstDayOfMonth = new Date(year, month, 1);
    let firstDayOfWeek = firstDayOfMonth.getDay();
    firstDayOfWeek = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1;

    const firstDisplayedDay = new Date(firstDayOfMonth);
    firstDisplayedDay.setDate(firstDayOfMonth.getDate() - firstDayOfWeek);

    const lastDayOfMonth = new Date(year, month + 1, 0);
    let lastDayOfWeek = lastDayOfMonth.getDay();
    lastDayOfWeek = (lastDayOfWeek === 0) ? 6 : lastDayOfWeek - 1;

    const lastDisplayedDay = new Date(lastDayOfMonth);
    lastDisplayedDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfWeek));

    const dayDiffInTime = lastDisplayedDay.getTime() - firstDisplayedDay.getTime();
    const shownDays = Math.round(dayDiffInTime / (1000 * 3600 * 24)) + 1;

    return {
        startDate: firstDisplayedDay,
        endDate: lastDisplayedDay,
        dayCount: shownDays
    };
}
export function convertTimeToPercentage(time: string) {
    const [hours] = time.split(":").map(Number);

    const percentage = (hours / 8) * 100;

    return percentage;
}
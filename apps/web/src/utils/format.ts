export function formatNOK(amount: number): string {
    return new Intl.NumberFormat("nb-NO", {
        style: "currency",
        currency: "NOK",
        maximumFractionDigits: 0,
    })
        .format(amount)
        .replace("NOK", "")
        .trim() + ",-";
}

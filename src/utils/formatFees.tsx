export default function formatFees(fee: any) {
	return (
		parseInt(
			fee ? fee : "200000"
		).toLocaleString("en-IN", {
			style: "currency",
			currency: "INR",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}))
}
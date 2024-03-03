export default function formatDate(dateString: string | number | Date) {
	if (!dateString) return "";
	const options: any = { year: "numeric", month: "short", day: "numeric" };
	return new Date(dateString).toLocaleDateString("en-US", options);
};
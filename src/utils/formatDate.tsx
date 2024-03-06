export function formatDate(dateString: string | number | Date) {
	if (!dateString) return "";
	const options: any = { year: "numeric", month: "short", day: "numeric" };
	return new Date(dateString).toLocaleDateString("en-US", options);
};

export function getDate(dateString: string) {
	const date = new Date(dateString);

	const year = date.getFullYear(); // Returns the year (e.g., 2024)
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return (`${day}-${month}-${year}`);
}
export default function formatFees(amount: number) {
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)} Lakhs`;
    } else if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(1)} Thousand`;
    } else if (amount !== null && amount !== undefined) {
        return `₹${amount}`;
    } else {
        return '₹ X'; // Return 'x' when amount is null or undefined
    }
}


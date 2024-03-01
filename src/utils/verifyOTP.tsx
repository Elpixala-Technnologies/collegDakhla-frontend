import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { phoneNumber, otp } = req.body;

	// Implement logic to verify OTP here
	// For simplicity, let's assume the OTP is correct if it matches '1234'
	if (otp === '1234') {
		res.status(200).json({ message: 'OTP verified. Login successful!' });
	} else {
		res.status(401).json({ message: 'Invalid OTP. Login failed.' });
	}
}

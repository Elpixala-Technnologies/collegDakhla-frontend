import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log("inside send otp")
	const { phoneNumber } = req.body;

	try {
		// Code to send OTP using Fast2SMS
		// Make sure to replace YOUR_API_KEY and YOUR_SENDER_ID with your actual Fast2SMS API Key and sender ID
		const response = await axios.post(
			'https://www.fast2sms.com/dev/bulk',
			{
				// sender_id: 'YOUR_SENDER_ID',
				language: 'english',
				route: 'qt',
				numbers: phoneNumber,
				message: 'Your OTP is: 1234', // Generate your OTP and replace it here
			},
			{
				headers: {
					Authorization: 'MC9pd7q0sNVHR2lw4jygh1fknFTQbxWSD6OJzumGIiBaArKv5EgS7EMw5aPcvxmJQ3e6qpryBhGjCutR',
					'Content-Type': 'application/json',
				},
			}
		);

		res.status(200).json({ message: 'OTP sent successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Failed to send OTP' });
	}
}

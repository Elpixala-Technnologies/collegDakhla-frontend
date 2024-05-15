import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cors from 'cors';

const corsMiddleware = cors();

let OTP: string;
export async function sendOtp(phoneNumber: string) {
	try {
		// Code to send OTP using Fast2SMS
		// Make sure to replace YOUR_API_KEY and YOUR_SENDER_ID with your actual Fast2SMS API Key and sender ID
		OTP = "5599";
		const response = await axios.post(
			"https://www.fast2sms.com/dev/bulkV2",
			{
				variables_values: OTP,
				route: "otp",
				numbers: phoneNumber,
			},
			{
				headers: {
					Authorization: "MC9pd7q0sNVHR2lw4jygh1fknFTQbxWSD6OJzumGIiBaArKv5EgS7EMw5aPcvxmJQ3e6qpryBhGjCutR",
					"Content-Type": "application/json",
				},
			}
		);
		return { message: "OTP sent successfully" };
	} catch (error) {
		return { message: "Failed to send OTP" };
	}
}

export function verifyOtp(userOTP: string) {
	try {
		if (userOTP === OTP) {
			return { message: "User Login successfully" };
		}
	} catch (error) {
		return { message: "Failed to login" };
	}
}

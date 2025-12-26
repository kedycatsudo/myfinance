"use client";
import React, { useEffect, useState } from "react";

export default function DateTimeDisplay() {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<span>
			{now.toLocaleDateString()} {now.toLocaleTimeString()}
		</span>
	);
}

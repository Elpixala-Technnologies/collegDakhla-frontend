"use client";
import TopCollectionCard from "@/components/card/topCollectionCard";
import HeroSection from "@/components/heroComponent/heroComponent";
export default function Home() {
	return (
		<>
			<div className="max-w-screen-2xl">
				<section>
					<HeroSection />
				</section>
				<section>
					<div className="p-4">
						<h2 className="text-lg font-bold">Top Collection</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
							<TopCollectionCard />
							<TopCollectionCard />
							<TopCollectionCard />
							<TopCollectionCard />
							<TopCollectionCard />
							<TopCollectionCard />
							<TopCollectionCard />
							<TopCollectionCard />
							<TopCollectionCard />
							<TopCollectionCard />
						</div>
					</div>
				</section>
				<section>
					<div className="p-4">
						<h2 className="text-lg font-bold">Top 100 Colleges</h2>
						<div className="">
							<table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-md overflow-hidden">
								<thead className="bg-gray-100">
									<tr>
										<th className="px-6 py-3 text-left font-semibold text-gray-700">
											Rank
										</th>
										<th className="px-6 py-3 text-left font-semibold text-gray-700">
											College
										</th>
										<th className="px-6 py-3 text-left font-semibold text-gray-700">
											Ranking
										</th>
										<th className="px-6 py-3 text-left font-semibold text-gray-700">
											Application Deadline
										</th>
										<th className="px-6 py-3 text-left font-semibold text-gray-700">
											Fees
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b border-gray-200">
										<td className="px-6 py-4 whitespace-nowrap">1</td>
										<td className="px-6 py-4 whitespace-nowrap">
											Example College
										</td>
										<td className="px-6 py-4 whitespace-nowrap">Top Ranked</td>
										<td className="px-6 py-4 whitespace-nowrap">2022-12-31</td>
										<td className="px-6 py-4 whitespace-nowrap">$10,000</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-6 py-4 whitespace-nowrap">1</td>
										<td className="px-6 py-4 whitespace-nowrap">
											Example College
										</td>
										<td className="px-6 py-4 whitespace-nowrap">Top Ranked</td>
										<td className="px-6 py-4 whitespace-nowrap">2022-12-31</td>
										<td className="px-6 py-4 whitespace-nowrap">$10,000</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-6 py-4 whitespace-nowrap">1</td>
										<td className="px-6 py-4 whitespace-nowrap">
											Example College
										</td>
										<td className="px-6 py-4 whitespace-nowrap">Top Ranked</td>
										<td className="px-6 py-4 whitespace-nowrap">2022-12-31</td>
										<td className="px-6 py-4 whitespace-nowrap">$10,000</td>
									</tr>
									<tr className="border-b border-gray-200">
										<td className="px-6 py-4 whitespace-nowrap">1</td>
										<td className="px-6 py-4 whitespace-nowrap">
											Example College
										</td>
										<td className="px-6 py-4 whitespace-nowrap">Top Ranked</td>
										<td className="px-6 py-4 whitespace-nowrap">2022-12-31</td>
										<td className="px-6 py-4 whitespace-nowrap">$10,000</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}

<script lang="ts">
	import { type Platform, type SaleType, type Series, type Total, type TotalTransactions, type TotalsByPlatform, type TotalsBySaleType, getTotalTransactions } from "$lib/api/client";
	import Boundary from "./Boundary.svelte";
	import Loading from "./Loading.svelte";
	import Sales from "./Sales.svelte";
	import { dateRange } from "$lib/state/date-range.svelte";
	import { settings } from "$lib/state/settings.svelte";
	import { useAsyncEffect } from "$lib/utils/async-effect.svelte";

	let	transactionsByPlatform: TotalTransactions = $state({
		total: {
			series: []
		},
	}),
		transactionsBySalesType: TotalTransactions = $state({
			total: {
				series: []
			},
		}),
		loading = $state(false),
		error: Error | null = $state(null);

	useAsyncEffect(
		async (signal: AbortSignal): Promise<void> => {
			if (!settings.vendorId || !dateRange.start || !dateRange.end) {
				return;
			}

			const getTransactionsBySalesType = getTotalTransactions(
				settings.vendorId,
				"type",
				dateRange.start,
				dateRange.end,
				signal
			),
				getTransactionsByPlatform = getTotalTransactions(
					settings.vendorId,
					"hosting",
					dateRange.start,
					dateRange.end,
					signal
				);

			[transactionsBySalesType, transactionsByPlatform] = await Promise.all([
				getTransactionsBySalesType,
				getTransactionsByPlatform
			]);
		},
		(isLoading: boolean): boolean => (loading = isLoading),
		(e: Error | null): Error | null => (error = e),
		(): unknown => [
			settings.vendorId,
			dateRange.start,
			dateRange.end
		]
	);

	type Totals = Total & { bySaleType: TotalsBySaleType };

	const	totals = $derived(
		transactionsBySalesType.total.series.reduce((acc: Totals, { name, elements }: Series): Totals => {
			const total = elements.reduce((sum: Total, { count, revenue }: Total): Total => {
				sum.count += count;
				sum.revenue += revenue;

				return sum;
			}, { count: 0, revenue: 0 });

			acc.count += total.count;
			acc.revenue += total.revenue;
			acc.bySaleType[name as SaleType].count += total.count;
			acc.bySaleType[name as SaleType].revenue += total.revenue;

			return acc;
		}, {
			count: 0,
			revenue: 0,
			bySaleType: {
				New: { count: 0, revenue: 0},
				Renewal: { count: 0, revenue: 0 },
				Upgrade: { count: 0, revenue: 0 },
				Downgrade: { count: 0, revenue: 0 },
				Refund: { count: 0, revenue: 0 },
			}
		})
	),
		totalsByPlatform = $derived(
			transactionsByPlatform.total.series.reduce((acc: TotalsByPlatform, { name, elements }: Series): TotalsByPlatform => {
				const total = elements.reduce((sum: Total, { count, revenue }: Total): Total => {
					sum.count += count;
					sum.revenue += revenue;

					return sum;
				}, { count: 0, revenue: 0 });

				acc[name as Platform].count += total.count;
				acc[name as Platform].revenue += total.revenue;

				return acc;
			}, {
				Cloud: { count: 0, revenue: 0},
				"Data Center": { count: 0, revenue: 0 },
				Server: { count: 0, revenue: 0 },
			})
		);

</script>

<Loading {loading}/>
<Boundary {error}>
	<Sales
		byPlatform={totalsByPlatform}
		bySaleType={totals.bySaleType}
		total={totals}
	/>
</Boundary>
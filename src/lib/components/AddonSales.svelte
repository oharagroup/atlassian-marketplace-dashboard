<script lang="ts">
	import { type Addon, type Total, type TotalsByPlatform, type TotalsBySaleType, type Transaction, getTransactions } from "$lib/api/client";
	import Boundary from "./Boundary.svelte";
	import Loading from "./Loading.svelte";
	import Sales from "./Sales.svelte";
	import { dateRange } from "$lib/state/date-range.svelte";
	import { settings } from "$lib/state/settings.svelte";
	import { useAsyncEffect } from "$lib/utils/async-effect.svelte";

	const { addon }: { addon: Addon } = $props();

	let	transactions: Transaction[] = $state([]),
		loading = $state(false),
		error: Error | null = $state(null);

	useAsyncEffect(
		async (signal: AbortSignal): Promise<void> => {
			if (!settings.vendorId || !dateRange.start || !dateRange.end) {
				return;
			}

			const txnsIter = getTransactions(
				settings.vendorId,
				addon.key,
				dateRange.start,
				dateRange.end,
				signal
			);

			transactions = [];

			for await (const trxs of txnsIter) {
				transactions.push(...trxs);
			}
		},
		(isLoading: boolean): boolean => (loading = isLoading),
		(e: Error | null): Error | null => (error = e),
		(): unknown => [
			settings.vendorId,
			dateRange.start,
			dateRange.end
		]
	);

	type TotalsBySaleTypeAndPlatform = Total & {
		bySaleType: TotalsBySaleType;
		byPlatform: TotalsByPlatform;
	};

	const	totals = $derived(
		transactions.reduce((acc: TotalsBySaleTypeAndPlatform, trx): TotalsBySaleTypeAndPlatform => {
			const { saleType, hosting, vendorAmount } = trx.purchaseDetails;

			acc.count += 1;
			acc.revenue += vendorAmount;
			acc.bySaleType[saleType].count += 1;
			acc.bySaleType[saleType].revenue += vendorAmount;
			acc.byPlatform[hosting].count += 1;
			acc.byPlatform[hosting].revenue += vendorAmount;

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
			},
			byPlatform: {
				Cloud: { count: 0, revenue: 0 },
				Server: { count: 0, revenue: 0 },
				"Data Center": { count: 0, revenue: 0 }
			}
		})
	);

</script>

<Loading {loading}/>
<Boundary {error}>
	<Sales
		byPlatform={totals.byPlatform}
		bySaleType={totals.bySaleType}
		total={totals}
	/>
</Boundary>
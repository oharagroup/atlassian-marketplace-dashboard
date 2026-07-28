import { settings } from "$lib/state/settings.svelte";

export interface App {
	productId: string;
	appName: string;
	images: {
		iconFileId: string;
	};
}

export interface Apps {
	items: App[];
}

export type Platform = "Cloud" | "Data Center" | "Server";
export type SaleType = "Downgrade" | "New" | "Refund" | "Renewal" | "Upgrade";

export interface Transaction {
	purchaseDetails: {
		hosting: Platform;
		tier: string;
		saleType: SaleType;
		vendorAmount: number;
	};
}

export interface Transactions {
	transactions: Transaction[];
	_links: {
		next?: {
			href: string;
		};
	};
}

export interface Total {
	count: number;
	revenue: number;
}

export interface Series {
	name: Platform | SaleType;
	elements: Total[];
}

export interface TotalTransactions {
	total: {
		series: Series[];
	};
}

export type TotalsByPlatform = Record<Platform, Total>;
export type TotalsBySaleType = Record<SaleType, Total>;

async function apiFetch<T>(path: string, signal: AbortSignal): Promise<T> {
	const apiHost = `${settings.apiUrl}/marketplace/rest/3/`,
		credentials = btoa(`${settings.userName}:${settings.password}`),
		headers = { headers: { Authorization: `Basic ${credentials}` } },
		response = await fetch(`${apiHost}${path}`, { ...headers, signal });

	if (!response.ok) {
		throw new Error(
			`Failed to fetch ${path}: ${response.status} ${response.statusText}`,
		);
	}

	return response.json() as Promise<T>;
}

export async function getApps(
	developerId: string,
	signal: AbortSignal,
): Promise<Apps> {
	return apiFetch<Apps>(
		`product-listing/developer-space/${developerId}`,
		signal,
	);
}

export async function* getTransactions(
	developerId: string,
	productId: string,
	startDate: string,
	endDate: string,
	signal: AbortSignal,
): AsyncGenerator<Transaction[]> {
	const PAGE_SIZE = 50;

	let data: Transactions,
		offset = 0;

	do {
		data = await apiFetch<Transactions>(
			`reporting/developer-space/${developerId}/sales/transactions?productId=${productId}&limit=50&offset=${offset}&startDate=${startDate}&endDate=${endDate}`,
			signal,
		);
		yield data.transactions;
		offset += PAGE_SIZE;
	} while (undefined !== data._links.next);
}

export async function getTotalTransactions(
	developerId: string,
	metric: "hosting" | "type",
	startDate: string,
	endDate: string,
	signal: AbortSignal,
): Promise<TotalTransactions> {
	return apiFetch<TotalTransactions>(
		`reporting/developer-space/${developerId}/sales/transactions/${metric}?aggregation=month&startDate=${startDate}&endDate=${endDate}`,
		signal,
	);
}

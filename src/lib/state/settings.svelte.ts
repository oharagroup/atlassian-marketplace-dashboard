const USER_NAME = "atlassian-id",
	PASSWORD = "atlassian-password",
	DEVELOPER_ID = "atlassian-developer-id",
	API_URL = "atlassian-marketplace-api-url",
	storage = "undefined" === typeof window ? null : window.localStorage;

export const settings = $state({
	userName: storage?.getItem(USER_NAME) ?? "",
	password: storage?.getItem(PASSWORD) ?? "",
	developerId: storage?.getItem(DEVELOPER_ID) ?? "",
	apiUrl: storage?.getItem(API_URL) ?? "https://api.atlassian.com",
});

export function saveSettings({
	userName,
	password,
	developerId,
	apiUrl,
}: typeof settings): void {
	storage?.setItem(USER_NAME, userName);
	storage?.setItem(PASSWORD, password);
	storage?.setItem(DEVELOPER_ID, developerId);
	storage?.setItem(API_URL, apiUrl);
}

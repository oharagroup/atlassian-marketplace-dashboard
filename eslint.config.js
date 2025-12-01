import { defineConfig } from "eslint/config";
import oharagroup from "eslint-config-oharagroup";

export default defineConfig(
	...oharagroup.svelte,
	{
		name: "atlassian-marketplace-dashboard/ignores",
		ignores: [".svelte-kit", "build"],
	},
	{
		name: "atlassian-marketplace-dashboard/base",
		rules: {
			// Needed for getTransactions generator function
			"no-await-in-loop": "off",
			// Some fields in Marketplace REST API responses use underscores
			"no-underscore-dangle": [
				"error",
				{
					allow: ["_embedded", "_links"],
					enforceInMethodNames: true,
					enforceInClassFields: true,
					allowInArrayDestructuring: false,
					allowInObjectDestructuring: false,
				},
			],
		},
	},
);

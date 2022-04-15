import localforage from 'localforage';

abstract class storage {
	static store: LocalForage | null = null;

	static init = () => {
		localforage.ready().then(() => {
			this.store = localforage.createInstance({
				name: 'h-hotel',
				driver: [localforage.WEBSQL,
					localforage.INDEXEDDB,
					localforage.LOCALSTORAGE],
				storeName: 'h-hotel',
				description: 'h-hotel store'
			});

			console.log("Store initialized succesfully!");
		}).catch((e) => {
			console.error(e);
		});
	}

	static getItem = async (key: string) => {
		return this.store?.getItem(key).catch((e) => {
			console.log(`Error getting given key ${key}`);
			console.error(e);
		});
	}

	static setItem = async (key: string, value: any) => {
		return this.store?.setItem(key, value).catch((e) => {
			console.log(`Error setting given key ${key}`);
			console.error(e);
		});
	}
}

export default storage;

import localforage from 'localforage';

export abstract class Storage {
	static live: boolean = false;
	static store: LocalForage;

	static init() {
		try {
			localforage.ready().then(() => {
				this.live = true;
				this.store = localforage.createInstance({
					driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
					version: 1.0,
					storeName: 'my-hotel-localstore',
					description: 'My Hotel App Localstore'
				});
			});
		} catch (error) {
			console.error('Localforage failed to start', error);
		}
	}

	static async set(key: string, value: any) {
		return await this.store.setItem(key, value);
	}

	static async get(key: string) {
		return await this.store.getItem(key);
	}

	static async remove(key: string) {
		return await this.store.removeItem(key);
	}

	static async clear() {
		return await this.store.clear();
	}
}
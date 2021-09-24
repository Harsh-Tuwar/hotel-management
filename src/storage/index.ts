import localforage from 'localforage';

export default abstract class Storage {
	static live: boolean = false;
	static store: LocalForage;

	static async init() {
		try {
			await localforage.ready().then(() => {
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
		if (this.live) {
			await this.store.setItem(key, JSON.stringify(value));
		} else {
			console.log('Not Live');
		}
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
export default class GameSavingLoader {
    static async load() {
        const response = await read();
        const jsonResponse = await json(response);
        return jsonResponse;
    }
}

export function json(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(String.fromCharCode.apply(null, new Uint16Array(data)));
        }, 500);
    });
}

export function read() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
            return (input => {
                const buffer = new ArrayBuffer(input.length * 2);
                const bufferView = new Uint16Array(buffer);
                for (let i = 0; i < input.length; i++) {
                    bufferView[i] = input.charCodeAt(i);
                }
                resolve(buffer);
            })(data);
        }, 1000);
    });
}

(async () => {
    try {
      const saving = await GameSavingLoader.load();
      const object = JSON.parse(saving);
      Object.getPrototypeOf(object);
    } catch (error) {
      throw (new Error(error));
    }
  })();

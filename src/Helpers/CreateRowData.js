class CreateRowData {
  constructor(key) {
    this.key = key;
  }

  create(data) {
    const objectWithKey = {};

    for (let i = 0; i < data.length; i++) {
      objectWithKey[this.key[i]] = data[i];
    }

    return objectWithKey;
  }
}

export default CreateRowData;

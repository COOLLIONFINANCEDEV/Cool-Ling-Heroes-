class CreateRowData {
  constructor(key) {
    this.key = key;
  }

  create(datas) {
    const objectWithKey = {};
    datas.forEach((item, key) => {
      objectWithKey[this.key[key]] = item;
    });
    return objectWithKey;
  }
}

export default CreateRowData;

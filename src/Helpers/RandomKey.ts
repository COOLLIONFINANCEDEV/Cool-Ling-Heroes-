const Randomkey = () => {
  let random_string = "";
  const char = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let i;

  for (i = 0; i < 30; i++) {
    random_string =
      random_string + char.charAt(Math.floor(Math.random() * char.length));
  }
  return random_string;
};

export default Randomkey;

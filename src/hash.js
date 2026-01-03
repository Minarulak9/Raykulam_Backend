const bcrypt = require("bcrypt");

(async () => {
  const hash = await bcrypt.hash("xadmin@321", 12);
  console.log(hash);

})();

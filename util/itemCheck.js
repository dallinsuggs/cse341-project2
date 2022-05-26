const res = require("express/lib/response")

const itemCheckFunction = (itemName, itemDeadline, itemPriority) => {
  if (typeof itemName != 'string' || itemName.length < 3) {
    res.status(400).send({ message: 'Bucketlist item name must be a string at least 3 characters long!' });
    return;
  }
  if (isNaN(itemDeadline) || itemDeadline.length != 4) {
    res.status(400).send({ message: 'Item deadline must be a valid 4-digit number (year).' });
    return;
  }
  if (isNaN(itemPriority) || itemPriority < 0) {
    res.status(400).send({ message: 'Item priority has to be a number greater than or equal to 0.' });
    return;
  }
};

module.exports.itemCheckFunction = itemCheckFunction;

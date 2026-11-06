const fs = require('fs');
const input = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const items = (input.items || []).map(item => {
  const receivable = Number(item.receivable || 0);
  const received = Number(item.received || 0);
  const refund = Number(item.refund || 0);
  const balance = Number((receivable - received - refund).toFixed(2));
  return {contractId:String(item.contractId),receivable,received,refund,balance,status:balance === 0 ? 'matched' : balance > 0 ? 'outstanding' : 'overpaid'};
});
const totalBalance = Number(items.reduce((sum,item) => sum + item.balance,0).toFixed(2));
console.log(JSON.stringify({status:'ok',formula_version:'1.0.0',items,totalBalance}, null, 2));

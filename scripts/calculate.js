const fs = require('fs');
const input = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const errors = [];
if (!Array.isArray(input.items) || input.items.length === 0) errors.push('应收核对明细不能为空');
const items = (Array.isArray(input.items) ? input.items : []).map((item, index) => {
  const contractId = String(item.contractId || '');
  if (!contractId) errors.push(`第${index + 1}行合同编号缺失`);
  const values = ['receivable','received','refund'].map(key => {
    const value = Number(item[key]);
    if (!Number.isFinite(value) || value < 0) errors.push(`${contractId || `第${index + 1}行`}.${key}必须是非负有限数值`);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  });
  const [receivable, received, refund] = values;
  const balance = Number((receivable - received - refund).toFixed(2));
  return {contractId,receivable,received,refund,balance,status:balance === 0 ? 'matched' : balance > 0 ? 'outstanding' : 'overpaid'};
});
if (errors.length) {
  console.log(JSON.stringify({status:'invalid',formula_version:'1.1.0',errors}, null, 2));
  process.exit(2);
}
const totalBalance = Number(items.reduce((sum,item) => sum + item.balance,0).toFixed(2));
const totals = items.reduce((acc,item) => {acc.receivable+=item.receivable;acc.received+=item.received;acc.refund+=item.refund;return acc;},{receivable:0,received:0,refund:0});
console.log(JSON.stringify({status:'ok',formula_version:'1.1.0',items,totalBalance,totals,requiresLedgerReview:true}, null, 2));

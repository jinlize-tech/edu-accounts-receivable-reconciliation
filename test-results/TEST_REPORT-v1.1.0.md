# 产品测试报告 v1.1.0

- 产品：应收款核对（JLZ-EDU-SK-064）
- 包状态：EDUCATION_1.1.0_PRE_RELEASE_ACCEPTED
- 模型运行状态：MODEL_RUNTIME_NOT_VERIFIED

| 层级 | 状态 | 检查数 | 失败数 |
|---|---|---:|---:|
| T1_FILE_STRUCTURE | PASS | 34 | 0 |
| T2_METADATA_CONTRACT | PASS | 45 | 0 |
| T3_PRODUCT_CONTRACT | PASS | 15 | 0 |
| T4_DETERMINISTIC_FUNCTION | PASS | 4 | 0 |
| T5_SCENARIO_TESTS | PASS | 13 | 0 |
| T6_SECURITY | PASS | 3 | 0 |
| T7_PACKAGE_INTEGRITY | PASS | 11 | 0 |

## 失败明细

- 无

## 运行边界

- T4/T5 包含实际 Node 计算脚本执行和输入边界场景执行。
- WorkBuddy解析、安装、调用和审核未执行，不在本轮验收中冒充通过。


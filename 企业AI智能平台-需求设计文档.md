# 企业AI智能平台 - 需求设计文档 (PRD)

| 文档版本 | 日期 | 作者 | 变更说明 |
|---------|------|------|---------|
| V1.0 | 2026-05-18 | - | 初稿 |

---

## 目录

1. [执行摘要](#1-执行摘要)
2. [问题定义与市场机会](#2-问题定义与市场机会)
3. [用户角色与场景](#3-用户角色与场景)
4. [产品功能需求](#4-产品功能需求)
5. [非功能需求](#5-非功能需求)
6. [系统架构设计](#6-系统架构设计)
7. [知识库与RAG系统](#7-知识库与rag系统)
8. [权限与安全模型](#8-权限与安全模型)
9. [技能/插件系统](#9-技能插件系统)
10. [API设计](#10-api设计)
11. [数据模型](#11-数据模型)
12. [实施路线图](#12-实施路线图)
13. [风险与缓解](#13-风险与缓解)
14. [附录](#14-附录)

---

## 1. 执行摘要

### 1.1 问题陈述

当前企业中，员工在查找内部知识、处理日常事务时面临信息分散、检索效率低下的问题。虽然市面上已有通用 AI 助手（如 ChatGPT），但存在以下核心痛点：

- **数据安全**：企业敏感数据不能上传到外部公共 AI 服务
- **权限缺失**：通用 AI 无法理解企业组织架构和权限体系，存在数据泄露风险
- **能力泛化**：通用 AI 不掌握企业内部知识，无法回答具体业务问题
- **不可定制**：无法根据各部门业务需要安装专用的功能和工具

### 1.2 解决方案

建设一个**企业内部的 AI 智能平台**，核心能力包括：

1. **企业内部知识库**：支持文档上传、智能解析、向量化存储，构建企业级知识资产
2. **RAG 检索增强生成**：基于知识库的智能问答，确保回答有据可依
3. **多维权限控制**：基于部门、角色、数据密级的精细化权限管理
4. **技能/插件市场**：允许用户自行安装和配置 AI 技能（类似 WorkBuddy 但去掉"专家"模式）
5. **多模型适配**：底层对接市面主流大模型（OpenAI / Claude / 文心 / 通义 / DeepSeek），支持私有化模型

### 1.3 核心指标

| 指标 | 目标 |
|------|------|
| 知识库检索准确率 (Recall@10) | ≥ 90% |
| 首次回答满意度 | ≥ 85% |
| 权限校验零漏报 | 100% |
| 系统可用性 (SLA) | ≥ 99.9% |
| 检索平均响应时间 (P95) | ≤ 2s |
| 知识库文档覆盖部门数 | 全部部门 100% |

### 1.4 总体时间线

| 阶段 | 周期 | 目标 |
|------|------|------|
| P0 - 基础平台 | 2-3 个月 | 架构搭建、认证权限、知识库 RAG 基础 |
| P1 - 对话交互 | 1-2 个月 | 智能对话引擎、多模型接入、多轮对话 |
| P2 - 技能生态 | 2-3 个月 | 技能市场、技能运行时 SDK |
| P3 - 运营完善 | 持续迭代 | 审计告警、数据洞察、性能优化 |

---

## 2. 问题定义与市场机会

### 2.1 客户痛点矩阵

| 角色 | 痛点 | 频率 | 影响程度 |
|------|------|------|---------|
| 普通员工 | 找不到需要的内部文档/制度 | 每天 | 高 - 影响工作效率 |
| 部门主管 | 新政策无法快速传达到全员 | 每周 | 中 - 信息传递成本高 |
| IT 管理员 | 无法控制 AI 能访问哪些数据 | 持续 | 高 - 数据安全风险 |
| 高管 | 决策所需数据分散在多个系统 | 每周 | 高 - 决策效率低 |

### 2.2 与竞品对比

| 维度 | 本平台 | 通用AI (ChatGPT等) | WorkBuddy | 开源方案 (Dify等) |
|------|--------|-------------------|-----------|-----------------|
| 数据私有化 | ✅ 完全内网 | ❌ 数据上传至外部 | ✅ 企业级 | ✅ 自部署 |
| 权限控制 | ✅ RBAC+ABAC+文档级 | ❌ 无 | ✅ 完善 | ⚠️ 基础 |
| 技能自定义 | ✅ 自由安装/开发 | ❌ 固定能力 | ⚠️ 需专家 | ✅ 支持 |
| 多模型切换 | ✅ 多模型+自建 | ❌ 单一 | ⚠️ 有限 | ✅ 支持 |
| 成本 | 中等 | 按量付费 | 高 | 低(自运维) |

### 2.3 核心差异化

1. **去"专家"化**：相比 WorkBuddy，任何普通员工都可以安装和使用技能，降低使用门槛
2. **数据安全零信任**：知识库数据不出域，权限校验覆盖请求全链路
3. **开放式技能生态**：支持官方技能 + 自定义技能 + 第三方技能

---

## 3. 用户角色与场景

### 3.1 用户角色定义

| 角色 | 描述 | 核心需求 |
|------|------|---------|
| **普通员工** | 各部门一线员工 | 快速检索知识、使用已授权的技能完成任务 |
| **部门负责人** | 各部门管理者 | 管理本部门知识库、配置本部门技能、查看使用统计 |
| **知识库管理员** | 专门维护知识库的员工 | 上传/管理文档、标注权限、监控检索质量 |
| **技能开发者** | 有一定开发能力的员工 | 开发和提交自定义技能 |
| **平台管理员** | IT 部门 | 系统配置、全局权限管理、模型管理、审计监控 |

### 3.2 典型用户场景

#### 场景一：员工查找内部制度（高频）

```
张三（销售部员工）在公司门户提问：
"今年Q2的销售激励政策是什么？"

后台处理流程：
1. 意图识别 → "销售政策查询"
2. 权限过滤 → 张三属于销售部，有权限访问销售政策文档
3. 知识库检索 → 在向量库中检索相关政策文档块
4. LLM 生成 → 基于检索到的政策内容生成回答
5. 返回结果 → "2025年Q2销售激励政策如下：..."
```

#### 场景二：跨部门协作查询（权限限制）

```
李四（研发部员工）提问：
"财务部今年的预算审批流程是什么？"

后台处理流程：
1. 意图识别 → "财务预算流程查询"
2. 权限过滤 → 李四属于研发部，**无权限**访问财务预算文档
3. 返回结果 → "抱歉，您没有权限访问财务预算相关文档，
   如需帮助请联系您的部门负责人或财务部。"
```

#### 场景三：使用技能完成任务

```
王五（HR专员）打开"生成入职通知书"技能：
1. 技能自动获取新员工信息（姓名、部门、入职日期等）
2. 调用 LLM 生成标准版入职通知书
3. 王五确认内容，一键发送邮件
```

---

## 4. 产品功能需求

### 4.1 功能总览

| 模块 | 功能 | 优先级 | 说明 |
|------|------|--------|------|
| **用户门户** | 智能对话界面 | P0 | 类 ChatGPT 的对话交互 |
| | 技能市场 | P0 | 浏览、安装、配置技能 |
| | 历史对话 | P1 | 查看和继续历史对话 |
| | 个人知识库 | P1 | 个人上传的私有文档 |
| **知识库管理** | 文档上传与解析 | P0 | 支持多种格式 |
| | 知识库分类管理 | P0 | 按部门/主题组织 |
| | 权限批量标注 | P0 | 文档级权限配置 |
| | 检索质量监控 | P1 | 人工反馈和评估 |
| **技能系统** | 官方技能预置 | P0 | 知识检索等基础技能 |
| | 技能上架/下架 | P0 | 管理员审批流程 |
| | 自定义技能开发 | P1 | 提供 SDK 和 API |
| | 技能沙箱测试 | P1 | 安全隔离测试环境 |
| **管理后台** | 用户与组织管理 | P0 | 对接企业 AD/LDAP |
| | 角色与权限管理 | P0 | RBAC + ABAC 配置 |
| | 模型管理 | P0 | 多模型路由配置 |
| | 审计日志 | P0 | 全链路操作审计 |
| | 使用统计与分析 | P1 | BI 看板 |

### 4.2 功能详细描述

#### FR-01：智能对话界面

**优先级**：P0

**描述**：用户与 AI 平台交互的主界面，提供类 ChatGPT 的对话体验

**功能点**：
- 自然语言输入框，支持多轮对话
- 对话历史侧边栏
- 对话上下文保持（可配置上下文窗口大小）
- 支持 Markdown / 代码块 / 表格渲染
- 引用来源标注（标注检索到的知识库文档）
- 对话导出（Markdown / PDF）
- 对话中可引用技能（如 "@财务技能 查询上月销售额"）

**验收标准**：
- [ ] 输入响应时间 ≤ 500ms（首字返回）
- [ ] 支持连续 50 轮以上对话
- [ ] 来源引用可点击跳转到原文
- [ ] 移动端适配（响应式）

#### FR-02：知识库管理

**优先级**：P0

**描述**：集中管理企业知识文档，支持全流程的知识数据处理

**功能点**：
- 支持上传格式：PDF、Word、Excel、PPT、TXT、Markdown、图片（OCR）
- 单文件大小限制：≤ 50MB
- 文档自动解析：版面分析 → 智能分段 → Embedding 向量化
- 文档预览（在线查看原始文档）
- 知识库目录树组织（按部门/主题/项目）
- 文档版本管理（更新后自动重新向量化）
- 批量导入（支持文件夹/压缩包）
- 权限批量标注（设置可见部门 + 数据密级 + 可见角色）

**验收标准**：
- [ ] 支持 10+ 种常见文档格式
- [ ] 文档解析成功率 ≥ 98%
- [ ] 单文档向量化处理时间 ≤ 30s（100 页以内）
- [ ] 支持百万级文档索引

#### FR-03：技能市场

**优先级**：P0

**描述**：类似 App Store 的技能安装市场

**功能点**：
- 技能分类浏览（全部 / 办公 / 数据 / 开发 / 自定义）
- 技能详情页（描述、使用说明、所需权限）
- 一键安装技能
- 技能权限配置（安装时可选择可见范围）
- 技能搜索
- 技能评分和评价
- 技能更新通知
- 官方技能 vs 自定义技能标签

**验收标准**：
- [ ] 支持技能一键安装和卸载
- [ ] 技能安装后即时生效
- [ ] 技能权限配置粒度达到部门级

#### FR-04：管理后台

**优先级**：P0

**描述**：平台管理员的配置管理中心

**功能点**：
- **用户管理**：同步企业 AD/LDAP 组织架构、用户导入导出、账号启停
- **权限管理**：角色定义、权限策略配置（RBAC+ABAC）、数据密级定义
- **模型管理**：模型供应商配置、模型路由规则、调用配额、费用监控
- **技能管理**：技能审核上架/下架、技能权限全局设置
- **审计日志**：检索日志、对话日志、操作日志、异常行为告警
- **系统设置**：全局参数配置、敏感词库、安全策略

**验收标准**：
- [ ] 支持 LDAP/AD 同步（增量同步周期 ≤ 5 分钟）
- [ ] 审计日志保留 ≥ 180 天
- [ ] 支持自定义审计告警规则

---

## 5. 非功能需求

### 5.1 性能需求

| 指标 | 目标 | 测量方式 |
|------|------|---------|
| 对话首字响应时间 (P95) | ≤ 2s | APM 监控 |
| 知识库检索响应时间 (P95) | ≤ 1.5s | 端到端监控 |
| 全文检索响应时间 (P95) | ≤ 500ms | ES 查询监控 |
| 文档上传解析时间 | ≤ 30s/100页 | 任务队列监控 |
| 系统并发用户数 | ≥ 1000 | 压测 |
| 系统吞吐量 (TPS) | ≥ 200 | 压测 |

### 5.2 可用性需求

| 指标 | 目标 |
|------|------|
| 系统可用性 (SLA) | ≥ 99.9%（月故障 ≤ 43 分钟） |
| 计划内维护窗口 | 每月第 2 个周日凌晨 2:00-4:00 |
| 故障恢复时间 (RTO) | ≤ 30 分钟 |
| 数据恢复点 (RPO) | ≤ 5 分钟 |

### 5.3 可扩展性需求

- 支持水平扩展（增加节点提升吞吐量）
- 知识库容量支持 10TB+
- 支持 10000+ 用户同时在线
- 服务组件可独立扩缩容

### 5.4 安全需求

| 类别 | 要求 |
|------|------|
| **传输安全** | 全链路 HTTPS，TLS 1.3 |
| **存储安全** | 敏感数据 AES-256 加密存储 |
| **认证安全** | 支持 SSO / OAuth2 / LDAP / MFA |
| **权限隔离** | 文档级访问控制，数据不出域 |
| **安全审计** | 全操作日志，异常行为告警 |
| **合规** | 符合《数据安全法》和《个人信息保护法》 |

### 5.5 兼容性需求

| 类别 | 要求 |
|------|------|
| **浏览器** | Chrome 90+, Firefox 90+, Safari 14+, Edge 90+ |
| **移动端** | 企业微信、钉钉、飞书内嵌 H5 |
| **API** | RESTful API + WebSocket |

---

## 6. 系统架构设计

### 6.1 分层架构

```
┌─────────────────────────────────────────────────────────────────┐
│                     用户接入层 (User Access Layer)                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │ Web 管理台  │ │ 企业 Portal │ │ 移动/企微   │ │ Open API   │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                  网关与安全层 (Gateway & Security Layer)           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  API 网关 (Kong/APISIX)                                   │  │
│  │  路由 / 限流 / 熔断 / 负载均衡 / 请求日志                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────┐ ┌──────────────────────────────────┐  │
│  │  SSO 统一认证          │ │  权限策略引擎 (Casbin/OPA)       │  │
│  │  OAuth2 / LDAP / CAS  │ │  RBAC + ABAC + 数据分级           │  │
│  └──────────────────────┘ └──────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                  核心业务服务层 (Core Service Layer)               │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────────┐   │
│  │ 对话引擎   │ │ 知识库服务 │ │ 技能引擎   │ │ 分析/统计服务 │   │
│  └───────────┘ └───────────┘ └───────────┘ └──────────────┘   │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                    │
│  │ 安全过滤   │ │ 上下文管理 │ │ 审计日志   │                    │
│  └───────────┘ └───────────┘ └───────────┘                    │
├─────────────────────────────────────────────────────────────────┤
│                  AI 能力与数据层 (AI & Data Layer)                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  多模型路由与适配器 (Model Gateway)                        │  │
│  │  OpenAI / Claude / 文心 / 通义 / DeepSeek / 私有化模型     │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────┐ ┌──────────────────────────────────┐  │
│  │  Embedding 服务       │ │  RAG 检索服务 (LangChain)        │  │
│  │  私有化部署中文模型    │ │  混合检索 + 重排序 + 权限过滤      │  │
│  └──────────────────────┘ └──────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                   基础设施层 (Infrastructure Layer)                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐   │
│  │ K8s  │ │CI/CD │ │ELK   │ │PostgreSQL│ │Redis  │ │消息队列  │   │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 技术栈推荐

| 模块 | 推荐方案 | 备选方案 |
|------|---------|---------|
| **前端框架** | React 18 + TypeScript | Vue 3 |
| **UI 组件库** | Ant Design 5.x | Semi Design |
| **后端框架** | Go (Gin) / Java (Spring Boot 3) | Python (FastAPI) |
| **API 网关** | Kong / APISIX | Nginx + Lua |
| **权限引擎** | Casbin | OPA (Open Policy Agent) |
| **向量数据库** | Milvus | Qdrant / PGVector |
| **搜索引擎** | Elasticsearch 8.x | Meilisearch |
| **关系数据库** | PostgreSQL 15+ | MySQL 8.0 |
| **缓存** | Redis 7.x | - |
| **消息队列** | Apache Kafka | RabbitMQ |
| **AI 编排** | LangChain / LangGraph | LlamaIndex |
| **私有化 Embedding** | BGE-large-zh / M3E | text2vec-large-chinese |
| **容器化** | Kubernetes + Docker | - |
| **监控** | Prometheus + Grafana | - |
| **日志** | ELK (Elasticsearch + Logstash + Kibana) | Loki |

### 6.3 核心服务组件

#### 6.3.1 对话引擎 (Chat Engine)

**职责**：
- 管理多轮对话上下文
- 路由请求到合适的技能或知识库
- 组装 Prompt 并调用 LLM
- 处理流式响应 (SSE/WebSocket)

**关键设计**：
- 上下文窗口使用滑动窗口策略，长度可配置
- 支持函数调用 (Function Calling) 触发技能
- 每次对话携带用户身份 Token 用于权限校验

#### 6.3.2 知识库服务 (Knowledge Service)

**职责**：
- 文档解析与管理
- 向量化索引构建
- 混合检索（向量 + 关键词）
- 权限过滤的检索结果

**关键设计**：
- 异步任务队列处理文档解析和向量化
- 检索链路：用户身份获取 → 权限预过滤 → 混合检索 → 重排序 → 权限后过滤 → 返回
- 文档更新后自动触发重新索引

#### 6.3.3 技能引擎 (Skill Engine)

**职责**：
- 技能注册与发现
- 技能调度（根据意图匹配技能）
- 技能执行沙箱
- 技能上下文传递

**关键设计**：
- 技能声明式定义（OpenAPI Schema / Function Calling Schema）
- 技能执行沙箱化（限制网络、文件系统访问）
- 技能可组合（一个技能的输出可作为另一个技能的输入）

#### 6.3.4 权限策略引擎 (Policy Engine)

**职责**：
- 策略定义与管理
- 运行时策略评估
- 策略缓存加速

**关键设计**：
- 采用 Casbin 或 OPA 作为底层引擎
- 策略模型：RBAC（角色基础）+ ABAC（属性基础）
- 文档级权限：每个文档块存储 {部门标签, 数据密级, 可见角色列表}
- 评估结果缓存（LRU 策略，TTL 5 分钟）

---

## 7. 知识库与RAG系统

### 7.1 知识库构建流程（离线）

```
文档上传 → 文档格式识别 → 内容提取(OCR/版面分析)
    → 智能分块(Chunking) → Embedding向量化
    → 存储向量+元数据(含权限标签) → 构建全文索引
```

#### 7.1.1 文档分块策略

| 文档类型 | 分块策略 | 块大小 | 重叠 |
|---------|---------|--------|------|
| PDF/Word（连续文本） | 语义段落分割 | 512 tokens | 64 tokens |
| PPT | 按幻灯片分割 | 每页一块 | - |
| Excel | 按工作表/表头分割 | 每个逻辑表一块 | - |
| 代码 | 按函数/类分割 | 200-500 tokens | - |
| 图片 | OCR文本提取 | 按页面 | - |

#### 7.1.2 向量化要求

- Embedding 模型：私有化部署在内部网络
- 向量维度：768 (BGE-large-zh) 或 1024 (M3E)
- 索引类型：IVF_FLAT（Milvus）或 HNSW（Qdrant）
- 分段权限标注：每个向量存储时附带 {dept_id, security_level, role_ids}

### 7.2 在线检索流程（实时）

```
用户提问
    ↓
意图识别 & 关键词提取
    ↓
获取用户身份上下文 (userId, deptId, roleIds, securityLevel)
    ↓
[权限预过滤] 确定用户可访问的文档范围 (SQL/Filter 下推)
    ↓
[混合检索]
    ├── 向量检索: 用户问题向量化 → TOP-K 相似度检索 (过滤后)
    └── 关键词检索: BM25 全文检索 (过滤后)
    ↓
[融合排序] 加权合并向量+关键词结果 (RRF 或 自定义加权)
    ↓
[重排序] Cross-Encoder 模型精排 (Top-N 重排)
    ↓
[权限后过滤] 逐条校验检索结果的权限
    ↓
[构建 Prompt] 检索结果 + 用户问题 → LLM Prompt
    ↓
LLM 生成回答 (流式返回)
```

### 7.3 混合检索策略

```
最终得分 = α × 向量相似度 + (1-α) × BM25 得分

其中 α 为可配置权重，默认 α = 0.6

向量检索：使用用户问题 Embedding，检索向量数据库中 Top-K (K=50)
关键词检索：使用 ES BM25 算法，检索 Top-K (K=50)
融合策略：RRF (Reciprocal Rank Fusion)
  score = Σ (1 / (k + rank_position))
  k=60（默认）
```

### 7.4 数据安全保障

| 安全措施 | 描述 |
|---------|------|
| **数据不落外部** | Embedding 模型私有化部署，向量数据库运行在内网 |
| **权限下推到存储层** | 向量数据库支持 Filter 表达式，在查询时即应用权限过滤 |
| **检索结果脱敏** | 发送到外部 LLM 的检索片段经过脱敏处理 |
| **敏感词过滤** | 提问和回答均经过敏感词库过滤 |
| **审计留痕** | 每一次检索记录完整的用户身份和检索内容 |

---

## 8. 权限与安全模型

### 8.1 权限模型总览

采用 **RBAC + ABAC 混合模型**，实现从粗粒度到细粒度的全面权限控制：

```
用户 (User)
  │
  ├── 所属部门 (Department)
  │     └── 上级部门 / 子部门 (层级关系)
  │
  ├── 担任角色 (Role) ── 角色权限 (Permission)
  │     ├── 系统管理员: 全部权限
  │     ├── 知识库管理员: 知识库管理权限
  │     ├── 部门负责人: 本部门全部权限
  │     └── 普通员工: 基础使用权限
  │
  └── 属性标签 (Attributes)
        ├── 数据密级: public / internal / dept / confidential / top_secret
        ├── 地域: 北京 / 上海 / 深圳
        └── 项目组: Project_A / Project_B
```

### 8.2 数据分级定义

| 密级 | 标识 | 描述 | 访问条件 | 示例 |
|------|------|------|---------|------|
| 公开 | 🔵 public | 全公司可见 | 所有认证用户 | 公司介绍、员工手册 |
| 内部 | 🟢 internal | 公司内部信息 | 所有在职员工 | 内部通讯录、会议室预订 |
| 部门内 | 🟡 dept | 仅限本部门 | 部门成员 + 上级部门领导 | 部门工作计划、KPI |
| 机密 | 🟠 confidential | 限定人员 | 特定角色 + 授权 | 薪酬数据、战略规划 |
| 绝密 | 🔴 top_secret | 极少数人 | 白名单 + 审批流 | 投资方案、董事会文件 |

### 8.3 权限控制点

| 控制点 | 控制粒度 | 校验时机 |
|--------|---------|---------|
| 知识库文档访问 | 文档 / 文档块 | 检索时 + 返回时 |
| 技能使用 | 技能级别 | 调用技能时 |
| 模型调用 | 模型级别 | 调用 LLM 时 |
| API 接口 | 接口级别 | 请求时 |
| 管理后台 | 功能模块级别 | 页面访问时 |

### 8.4 安全架构要求

```
┌─────────────────────────────────────────┐
│           外部请求                        │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  1. API 网关层                           │
│   - TLS 终止                            │
│   - 限流 / WAF                          │
│   - Token 验证 (JWT)                    │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  2. 身份认证层 (SSO/OAuth2)              │
│   - 提取用户身份                         │
│   - 注入请求上下文 (userId, dept, roles) │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  3. 权限策略引擎 (Casbin/OPA)            │
│   - 评估策略 (RBAC+ABAC)                │
│   - 返回 allow/deny + 数据过滤条件       │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  4. 业务服务层                           │
│   - 根据权限条件执行查询                  │
│   - 数据返回前二次校验                    │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  5. 审计日志记录                         │
│   - 全链路 Trace ID                      │
│   - 记录请求、策略评估、响应             │
└─────────────────────────────────────────┘
```

---

## 9. 技能/插件系统

### 9.1 技能定义

技能（Skill）是平台的可扩展功能单元，每个技能是一个独立的功能模块，可以被用户安装和使用。

#### 技能清单 Schema

```yaml
skill:
  id: "skill_001"
  name: "入职通知书生成"
  version: "1.0.0"
  type: "official" | "custom" | "third_party"
  description: "自动生成新员工入职通知书"
  
  # 技能触发方式
  trigger:
    type: "intent"          # intent: 意图匹配 | command: 命令式 | auto: 自动
    keywords: ["入职", "offer", "录用"]
  
  # 所需权限声明
  permissions:
    requires_knowledge_base: true
    required_data_sources: ["hr_system"]
    required_roles: ["hr_specialist"]
  
  # 可见范围（安装时配置）
  visibility:
    departments: ["hr", "admin"]
    roles: ["hr_specialist", "hr_manager"]
  
  # 技能入口
  entrypoints:
    - type: "function_call"
      function:
        name: "generate_onboarding_letter"
        description: "生成入职通知书"
        parameters:
          type: "object"
          properties:
            employee_name:
              type: "string"
              description: "员工姓名"
            department:
              type: "string"
              description: "部门"
           入职日期:
              type: "string"
              format: "date"
```

### 9.2 技能生命周期

```
[创建] → [测试(沙箱)] → [提交审核] → [审核通过] → [上架市场]
                                                          ↓
                                           [用户安装] → [权限配置] → [激活使用]
                                                          ↓
                                                     [技能更新] → [重新审核]
                                                          ↓
                                                     [技能下架/卸载]
```

### 9.3 技能类型

| 类型 | 说明 | 示例 | 实现方式 |
|------|------|------|---------|
| **检索型** | 基于知识库的问答 | 政策问答、制度查询 | RAG + LLM |
| **生成型** | 纯 LLM 内容生成 | 周报生成、文案撰写 | LLM 调用 |
| **工具型** | 调用外部 API | 天气查询、翻译 | Function Calling |
| **数据型** | 数据库/BI 查询 | 销售报表、KPI查询 | NL2SQL + 数据服务 |
| **集成型** | 对接企业系统 | 发起审批、发送邮件 | Webhook / API |
| **复合型** | 多步组合操作 | 入职办理（生成文书+创建账号+发邮件） | 工作流编排 |

### 9.4 技能运行时架构

```
技能调用请求
    ↓
技能调度器 (根据意图匹配技能)
    ↓
权限校验 (用户是否有技能使用权限)
    ↓
技能沙箱初始化 (隔离环境)
    ├── 注入用户上下文 (userId, dept, role)
    ├── 注入技能配置 (API Key, 连接信息)
    └── 设置资源限制 (CPU/内存/网络)
    ↓
技能执行
    ├── 调用 LLM (通过模型路由)
    ├── 调用外部 API (通过沙箱代理)
    └── 调用知识库 (携带用户身份)
    ↓
结果返回 → 审计日志记录
```

### 9.5 技能 SDK

提供技能开发 SDK，方便内部开发者快速创建技能：

```python
# 示例：Python 技能 SDK
from ai_platform_sdk import Skill, intent, param

class OnboardingLetterSkill(Skill):
    skill_id = "onboarding_letter"
    name = "入职通知书生成"
    version = "1.0.0"
    
    @intent(keywords=["入职", "offer", "录用通知"])
    async def generate_letter(
        self,
        ctx: Context,
        employee_name: str = param("员工姓名"),
        department: str = param("部门", required=False),
        join_date: str = param("入职日期", required=False)
    ) -> str:
        # ctx.user 包含当前用户身份信息
        # ctx.knowledge_base 可访问知识库
        # ctx.llm 可调用大模型
        
        template = await ctx.knowledge_base.search("入职通知书模板")
        result = await ctx.llm.generate(
            prompt=f"基于以下模板为员工{employee_name}生成入职通知书...",
            context=template
        )
        return result
```

---

## 10. API设计

### 10.1 API 规范

- 基础路径：`/api/v1`
- 协议：HTTPS
- 格式：JSON (RESTful)
- 认证：Bearer Token (JWT)
- 流式响应：SSE (Server-Sent Events)

### 10.2 核心 API 端点

#### 对话相关

```
POST /api/v1/chat/completions    # 发起对话（流式）
POST /api/v1/chat/conversations  # 创建会话
GET  /api/v1/chat/conversations  # 获取会话列表
GET  /api/v1/chat/conversations/:id  # 获取会话详情
DELETE /api/v1/chat/conversations/:id # 删除会话
```

#### 知识库相关

```
POST   /api/v1/knowledge/documents        # 上传文档
GET    /api/v1/knowledge/documents        # 文档列表
GET    /api/v1/knowledge/documents/:id    # 文档详情
DELETE /api/v1/knowledge/documents/:id    # 删除文档
PUT    /api/v1/knowledge/documents/:id/permissions  # 设置权限
POST   /api/v1/knowledge/search           # 检索知识库
```

#### 技能相关

```
GET    /api/v1/skills                     # 技能市场列表
GET    /api/v1/skills/:id                 # 技能详情
POST   /api/v1/skills/:id/install         # 安装技能
POST   /api/v1/skills/:id/uninstall       # 卸载技能
POST   /api/v1/skills                     # 创建自定义技能
PUT    /api/v1/skills/:id                 # 更新技能
```

#### 权限管理

```
GET    /api/v1/permissions/users/:id      # 用户权限
GET    /api/v1/permissions/check          # 权限校验
POST   /api/v1/permissions/policies       # 创建策略
PUT    /api/v1/permissions/policies/:id   # 更新策略
```

#### 管理相关

```
GET    /api/v1/admin/audit-logs           # 审计日志
GET    /api/v1/admin/statistics           # 统计报表
PUT    /api/v1/admin/models/config        # 模型配置
GET    /api/v1/admin/models/status        # 模型状态
```

### 10.3 对话接口示例

```json
// POST /api/v1/chat/completions
// Request
{
  "conversation_id": "conv_abc123",
  "message": "今年Q2的销售激励政策是什么？",
  "stream": true,
  "skills": ["knowledge_search"],
  "context": {
    "department": "sales",
    "security_level": "internal"
  }
}

// Response (SSE stream)
data: {"type": "chunk", "content": "根据"}
data: {"type": "chunk", "content": "2025年Q2销售激励政策"}
data: {"type": "chunk", "content": "..."}
data: {
  "type": "done",
  "sources": [
    {
      "doc_id": "doc_001",
      "title": "2025年Q2销售激励政策.pdf",
      "relevance": 0.95,
      "page": 3
    }
  ],
  "usage": {
    "prompt_tokens": 1200,
    "completion_tokens": 350,
    "model": "gpt-4o"
  }
}
```

---

## 11. 数据模型

### 11.1 核心实体关系

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   User      │─────│  Department  │     │   Role      │
└─────────────┘     └──────────────┘     └─────────────┘
       │                                        │
       │                                       │
┌──────┴───────────────────────────────────────┴──────────┐
│                    Permission Policy                      │
└──────────────────────────────────────────────────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────┐    ┌──────────────────┐    ┌──────────────┐
│ Document │    │  Document Chunk  │    │    Skill      │
│ (源文件)  │    │  (文档块+向量)    │    │   (技能)     │
└──────────┘    └──────────────────┘    └──────────────┘
       │                    │
       │                    │
┌──────┴────────────────────┴───────────────────────────┐
│                    Conversation                        │
│  (对话 - 含用户消息 + AI回复 + 引用来源)                 │
└───────────────────────────────────────────────────────┘
```

### 11.2 核心数据表设计

#### users（用户表）

```sql
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id   VARCHAR(64) UNIQUE NOT NULL,    -- 工号
    name          VARCHAR(128) NOT NULL,           -- 姓名
    email         VARCHAR(256) UNIQUE NOT NULL,    -- 邮箱
    department_id UUID REFERENCES departments(id), -- 所属部门
    title         VARCHAR(128),                    -- 职位
    security_level VARCHAR(32) DEFAULT 'internal', -- 用户最高密级
    is_active     BOOLEAN DEFAULT true,
    created_at    TIMESTAMP DEFAULT now(),
    updated_at    TIMESTAMP DEFAULT now()
);
```

#### departments（部门表）

```sql
CREATE TABLE departments (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(256) NOT NULL,
    parent_id   UUID REFERENCES departments(id),  -- 上级部门
    level       INT NOT NULL DEFAULT 1,           -- 层级深度
    manager_id  UUID REFERENCES users(id),        -- 部门负责人
    path        LTREE NOT NULL,                   -- 部门路径（物化路径）
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMP DEFAULT now()
);
```

#### roles（角色表）

```sql
CREATE TABLE roles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(128) NOT NULL,
    code        VARCHAR(64) UNIQUE NOT NULL,      -- 角色编码
    description TEXT,
    is_system   BOOLEAN DEFAULT false,            -- 系统内置角色
    created_at  TIMESTAMP DEFAULT now()
);
```

#### documents（文档表）

```sql
CREATE TABLE documents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(512) NOT NULL,
    file_type       VARCHAR(32) NOT NULL,         -- pdf/docx/xlsx/pptx/txt
    file_size       BIGINT NOT NULL,              -- 文件大小(字节)
    file_path       VARCHAR(1024),                -- 存储路径
    chunk_count     INT DEFAULT 0,                -- 分块数
    status          VARCHAR(32) DEFAULT 'processing',  -- processing/completed/failed
    uploader_id     UUID REFERENCES users(id),
    department_id   UUID REFERENCES departments(id),    -- 所属部门
    security_level  VARCHAR(32) DEFAULT 'internal',     -- 文档密级
    tags            JSONB DEFAULT '[]',                 -- 标签
    created_at      TIMESTAMP DEFAULT now(),
    updated_at      TIMESTAMP DEFAULT now()
);

-- 文档权限关联表
CREATE TABLE document_permissions (
    document_id     UUID REFERENCES documents(id) ON DELETE CASCADE,
    department_id   UUID REFERENCES departments(id),    -- 可见部门
    role_id         UUID REFERENCES roles(id),          -- 可见角色
    permission_type VARCHAR(32) DEFAULT 'read',         -- read/write/admin
    PRIMARY KEY (document_id, department_id, role_id)
);
```

#### document_chunks（文档块表 - 向量数据库）

```sql
-- 此表在向量数据库(Milvus/Qdrant)中实现
-- 以下为逻辑结构

{
  "id": "chunk_uuid",
  "document_id": "doc_uuid",
  "content": "文档块文本内容",
  "chunk_index": 1,
  "page_number": 3,
  
  -- 向量字段 (768维)
  "embedding": [0.123, 0.456, ...],
  
  -- 权限元数据 (用于检索时的Filter)
  "department_ids": ["dept_uuid_1", "dept_uuid_2"],
  "security_level": "internal",
  "role_ids": ["role_uuid_1"],
  
  -- 全文检索字段
  "keywords": ["销售", "激励", "Q2"]
}
```

#### conversations（对话表）

```sql
CREATE TABLE conversations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) NOT NULL,
    title       VARCHAR(256),                    -- 自动生成的对话标题
    skills      JSONB DEFAULT '[]',              -- 对话中使用的技能
    message_count INT DEFAULT 0,
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMP DEFAULT now(),
    updated_at  TIMESTAMP DEFAULT now()
);

CREATE TABLE messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role            VARCHAR(32) NOT NULL,        -- user / assistant / system
    content         TEXT NOT NULL,
    sources         JSONB,                       -- 引用的文档块
    tokens_used     INT,
    model_used      VARCHAR(128),
    permission_check JSONB,                      -- 权限校验记录
    created_at      TIMESTAMP DEFAULT now()
);
```

#### skills（技能表）

```sql
CREATE TABLE skills (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(256) NOT NULL,
    version         VARCHAR(32) NOT NULL,
    type            VARCHAR(32) NOT NULL,        -- official/custom/third_party
    description     TEXT,
    skill_schema    JSONB NOT NULL,              -- 技能声明（OpenAPI Schema）
    status          VARCHAR(32) DEFAULT 'draft', -- draft/pending/approved/rejected/disabled
    developer_id    UUID REFERENCES users(id),
    icon            VARCHAR(512),
    created_at      TIMESTAMP DEFAULT now(),
    updated_at      TIMESTAMP DEFAULT now()
);

-- 技能安装记录
CREATE TABLE skill_installations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id        UUID REFERENCES skills(id),
    user_id         UUID REFERENCES users(id),
    department_id   UUID REFERENCES departments(id),  -- 安装到指定部门
    config          JSONB DEFAULT '{}',               -- 技能配置
    is_active       BOOLEAN DEFAULT true,
    installed_at    TIMESTAMP DEFAULT now()
);
```

#### audit_logs（审计日志表）

```sql
CREATE TABLE audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trace_id        VARCHAR(64) NOT NULL,         -- 全链路追踪ID
    user_id         UUID REFERENCES users(id),
    action          VARCHAR(64) NOT NULL,          -- search/chat/skill_execute/document_access
    resource_type   VARCHAR(64),                  -- document/knowledge/skill/model
    resource_id     VARCHAR(128),
    request         JSONB,                        -- 请求内容（脱敏）
    response        JSONB,                        -- 响应内容（脱敏）
    permission_result VARCHAR(32),                -- allow/deny
    ip_address      INET,
    user_agent      TEXT,
    duration_ms     INT,
    created_at      TIMESTAMP DEFAULT now()
);

-- 分区表（按月分区）
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
```

---

## 12. 实施路线图

### 12.1 P0 - 基础平台（第1-12周）

| 阶段 | 周次 | 里程碑 | 交付物 |
|------|------|--------|--------|
| 环境搭建 | W1-W2 | 开发环境就绪 | K8s 集群、CI/CD 流水线、数据库部署 |
| 认证与组织 | W3-W4 | 用户认证完成 | SSO 对接、组织架构同步、角色定义 |
| 知识库基础 | W5-W8 | 知识库 MVP | 文档上传/解析/向量化、基础检索 |
| 权限引擎 | W9-W10 | 权限体系完成 | RBAC+ABAC 策略引擎、文档级权限 |
| 对话 MVP | W11-W12 | 基础对话可用 | 对话界面、多模型接入、RAG 问答 |

### 12.2 P1 - 对话交互（第13-20周）

| 阶段 | 周次 | 里程碑 | 交付物 |
|------|------|--------|--------|
| 对话增强 | W13-W15 | 高质量对话 | 多轮对话、上下文管理、引用溯源 |
| 模型管理 | W16-W17 | 模型路由 | 多模型切换、Fallback、费用监控 |
| 安全完善 | W18-W19 | 安全合规 | 敏感词过滤、审计日志、异常告警 |
| 内测发布 | W20 | 内部 Beta | 选定部门试用 |

### 12.3 P2 - 技能生态（第21-32周）

| 阶段 | 周次 | 里程碑 | 交付物 |
|------|------|--------|--------|
| 技能框架 | W21-W24 | 技能引擎 | 技能注册、调度、沙箱执行 |
| 技能市场 | W25-W28 | 技能市场 | 技能浏览/安装/配置、预置官方技能 |
| 技能 SDK | W29-W30 | 开发工具 | SDK 文档、示例技能、沙箱测试环境 |
| 全量发布 | W31-W32 | GA 发布 | 全公司开放、运营后台 |

### 12.4 P3 - 运营完善（持续）

| 方向 | 内容 |
|------|------|
| 数据洞察 | 使用统计 BI 看板、检索质量评估 |
| 性能优化 | 检索延迟优化、缓存策略、冷热数据分离 |
| 生态建设 | 第三方技能接入、技能开发者激励 |
| AI 能力 | Agent 模式、多步推理、多模态支持 |

---

## 13. 风险与缓解

| 编号 | 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|------|---------|
| R1 | 大模型 API 服务不稳定 | 中 | 高 | 多模型 Fallback、私有化模型备份 |
| R2 | 知识库文档量大导致检索延迟 | 中 | 中 | 分库分表、缓存策略、异步索引构建 |
| R3 | 权限策略过于复杂影响性能 | 中 | 高 | 策略缓存（LRU）、规则预编译 |
| R4 | 用户反馈不准确/拒绝使用 | 低 | 高 | 渐进式推广、Kill Switch、人工客服兜底 |
| R5 | 数据安全合规风险 | 低 | 极高 | 第三方安全审计、等保三级、数据加密 |
| R6 | 技能市场管理失控 | 中 | 中 | 沙箱隔离、审核流程、运行监控 |
| R7 | 模型幻觉（虚假信息） | 中 | 高 | RAG 必须返回来源、知识库检索置信度阈值设置 |

---

## 14. 附录

### 14.1 关键术语表

| 术语 | 定义 |
|------|------|
| **RAG** | Retrieval-Augmented Generation，检索增强生成 |
| **Embedding** | 将文本转换为向量表示的技术 |
| **RBAC** | Role-Based Access Control，基于角色的访问控制 |
| **ABAC** | Attribute-Based Access Control，基于属性的访问控制 |
| **Function Calling** | LLM 调用外部函数的能力 |
| **BM25** | 全文检索常用的排序算法 |
| **RRF** | Reciprocal Rank Fusion，多路召回融合算法 |
| **Sandbox** | 技能执行的安全隔离环境 |
| **SSE** | Server-Sent Events，服务端推送的流式传输协议 |

### 14.2 参考文档

- [LangChain 官方文档](https://python.langchain.com/)
- [Milvus 向量数据库](https://milvus.io/docs)
- [Casbin 权限管理](https://casbin.org/docs/)
- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- 企业组织架构数据对接方案（需根据实际情况补充）

### 14.3 待确认事项

1. **底层大模型选型**：优先接入哪些模型？是否需要在公司内部署私有化模型（如 Llama、Qwen 等）？
2. **企业现有 IT 系统**：需要对接哪些内部系统（OA、HR、CRM 等）？
3. **组织架构来源**：用户数据从 AD/LDAP 还是 HR 系统同步？
4. **部署环境**：完全私有化部署还是混合云架构？
5. **知识库数据来源**：初始数据是迁移现有文档还是从零开始建立？
6. **合规要求**：是否需要通过等保三级或其他认证？

---

> **文档结束**
